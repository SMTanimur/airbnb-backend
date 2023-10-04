/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Reservation } from './schema/reservation.schema';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create.list-dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags(Reservation.name)
@Controller({ path: 'reservations', version: '1' })
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: 'create a New Reservations' })
  @ApiCreatedResponse({ description: 'Create a Reservations' })
  @Post()
  createList(@Body() createListDto: CreateReservationDto, @Req() req) {
    createListDto.userId = req.user._id;
    return this.reservationsService.create(createListDto);
  }
}
