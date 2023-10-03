import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schema/list.schema';
import { Reservation, ReservationSchema } from './schema/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: List.name, schema: ListSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
