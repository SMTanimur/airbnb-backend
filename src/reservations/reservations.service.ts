/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { List, ListSchema } from 'src/lists/schema/list.schema';
import { Reservation, ReservationSchema } from './schema/reservation.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateListDto } from 'src/lists/dto/create.list-dto';
import { CreateReservationDto } from './dto/create.list-dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(List.name)
    private listModel: Model<ListSchema>,

    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationSchema>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const startDate = new Date(createReservationDto.startDate);
    const endDate = new Date(createReservationDto.endDate);
    // Create the reservation with references to userId and listingId
    const reservation = await this.reservationModel.create({
      ...createReservationDto,
      startDate,
      endDate,
    });

    // Update the user's reservations array with the new reservation
    await this.userModel.findByIdAndUpdate(createReservationDto.userId, {
      $push: { reservations: reservation._id },
    });

    // Update the listing's reservations array with the new reservation
    await this.listModel.findByIdAndUpdate(createReservationDto.listingId, {
      $push: { reservations: reservation._id },
    });

    return {
      message: 'Reservation created successfully',
    };
  }
  async getUserReservations(userId: string) {
    const data = await this.reservationModel
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate('listingId');

    return data;
  }

  async deleteReservation(reservationId: string) {
    const reservation = await this.reservationModel.findById(reservationId);
    if (!reservation) {
      return new NotFoundException('Reservation not found');
    }
    await this.userModel.findByIdAndUpdate(reservation.userId, {
      $pull: { reservations: reservation._id },
    });
    await this.listModel.findByIdAndUpdate(reservation.listingId, {
      $pull: { reservations: reservation._id },
    });
    await this.reservationModel.deleteOne({ _id: reservationId });

    return {
      message: 'Reservation deleted successfully',
    };
  }
}
