import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { List, ListSchema } from 'src/lists/schema/list.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schema/reservation.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: List.name, schema: ListSchema },
      { name: Reservation.name, schema: ReservationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
