import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create.list-dto';

export class UpdateListDto extends PartialType(CreateReservationDto) {}
