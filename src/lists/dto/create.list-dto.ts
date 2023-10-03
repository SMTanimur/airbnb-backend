import { ApiProperty, PickType } from '@nestjs/swagger';
import { List } from '../schema/list.schema';

export class CreateListDto extends PickType(List, [
  'bathroomCount',
  'category',
  'description',
  'guestCount',
  'host',
  'locationValue',
  'reservations',
  'roomCount',
  'title',
  'price',
]) {}
