/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListSchema } from 'src/lists/schema/list.schema';
import { Reservation, ReservationSchema } from './schema/reservation.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateListDto } from 'src/lists/dto/create.list-dto';
import { CreateReservationDto } from './dto/create.list-dto';

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
    const reservation = await this.reservationModel.create(
      createReservationDto,
    );
    await this.userModel.findByIdAndUpdate(reservation._id, {
      $push: { reservations: reservation._id },
    });
    await this.listModel.findByIdAndUpdate(reservation._id, {
      $push: { reservations: reservation._id },
    });
    return {
      message: 'List created successfully',
    };
  }
}
