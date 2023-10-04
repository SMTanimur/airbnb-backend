/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
@ApiTags(Reservation.name)
@Controller({ path: 'reservations', version: '1' })
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: 'create a New Reservations' })
  @ApiCreatedResponse({ description: 'Create a Reservations' })
  @UseGuards(JwtGuard)
  @Post()
  createList(@Body() createListDto: CreateReservationDto, @Req() req) {
    createListDto.userId = req.user._id;
    return this.reservationsService.create(createListDto);
  }
  @ApiOperation({ summary: 'Delete a Reservations' })
  @ApiCreatedResponse({ description: 'Delete a Reservations' })
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get all Listing' })
  @Get()
  async getUserReservations(@Req() req) {
    return this.reservationsService.getUserReservations(req.user?._id);
  }
}
