import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListSchema } from './schema/list.schema';
import mongoose, { PaginateModel } from 'mongoose';
import {
  Reservation,
  ReservationSchema,
} from '../reservations/schema/reservation.schema';
import { CreateListDto } from './dto/create.list-dto';
import { GetListsDto } from './dto/get-lists.dto';
import { PaginationResponse } from 'src/common/dto/response.middleware';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name)
    private listModel: PaginateModel<ListSchema>,

    @InjectModel(Reservation.name)
    private reservationModel: PaginateModel<ReservationSchema>,
  ) {}

  async create(createListDto: CreateListDto) {
    await this.listModel.create(createListDto);
    return {
      message: 'List created successfully',
    };
  }

  async getLists({
    limit,
    page,
    host,
    bathroomCount,
    category,
    endDate,
    guestCount,
    locationValue,
    roomCount,
    startDate,
    orderBy,
    sortedBy,
  }: GetListsDto) {
    const options = {
      limit,
      page,
      populate: ['host'],
    };
    const query: any = {};

    // if (startDate && endDate) {
    //   query['reservations.startDate'] = {
    //     $not: {
    //       $or: [
    //         {
    //           $and: [
    //             {
    //               $gte: ['$reservations.startDate', startDate],
    //               $lte: ['$reservations.startDate', endDate],
    //             },
    //           ],
    //         },
    //         {
    //           $and: [
    //             {
    //               $lte: ['$reservations.startDate', endDate],
    //               $gte: ['$reservations.endDate', startDate],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   };
    // }

    if (host) {
      query['host'] = new mongoose.Types.ObjectId(host);
    }

    if (bathroomCount) {
      query['bathroomCount'] = Number(bathroomCount);
    }

    if (category) {
      query['category'] = category.trim();
    }

    if (endDate) {
      query['endDate'] = endDate;
    }

    if (guestCount) {
      query['guestCount'] = Number(guestCount);
    }

    if (locationValue) {
      query['locationValue'] = locationValue.trim();
    }

    if (roomCount) {
      query['roomCount'] = Number(roomCount);
    }

    if (orderBy && sortedBy) {
      const sortOption = {};
      sortOption[orderBy] = sortedBy === 'asc' ? 1 : -1;
      options['sort'] = sortOption;
    }

    const responses = await this.listModel.paginate(query, options);
    console.log(responses);
    return PaginationResponse(responses);
  }
  async findOne(id: string) {
    return (await this.listModel.findById(id)).populate([
      'host',
      'reservations',
    ]);
  }
}
