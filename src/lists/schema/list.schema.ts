import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { User } from 'src/users/schema/user.schema';
import { Reservation, ReservationSchema } from './reservation.schema';

export type ListSchema = List & Document;

@Schema({ timestamps: true })
export class List {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsString()
  category: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsNumber()
  roomCount: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsNumber()
  bathroomCount: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsNumber()
  guestCount: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsString()
  locationValue: string;

  @ApiProperty({ required: true })
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  host: User;

  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  @Prop({ type: [ReservationSchema] })
  reservations?: Types.Array<Reservation>;
}
export const ListSchema = SchemaFactory.createForClass(List);
