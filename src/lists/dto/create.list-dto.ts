import { PickType } from '@nestjs/swagger';
import { List } from '../schema/list.schema';

export class CreateListDto extends PickType(List, [
  'bathroomCount',
  'category',
  'description',
  'guestCount',
  'host',
  'locationValue',
  'imageSrc',
  'roomCount',
  'title',
  'price',
]) {}
