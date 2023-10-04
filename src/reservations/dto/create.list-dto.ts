import { PickType } from '@nestjs/swagger';
import { Reservation } from '../schema/reservation.schema';

export class CreateReservationDto extends PickType(Reservation, [
  'endDate',
  'startDate',
  'listingId',
  'userId',
  'totalPrice',
]) {}
