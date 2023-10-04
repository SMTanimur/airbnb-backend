import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export type ReservationSchema = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: true })
  @Prop({ type: Date, required: true })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ required: true })
  @Prop({ type: Date, required: true })
  @IsNotEmpty()
  startDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ required: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List' })
  @IsNotEmpty()
  listingId: mongoose.Schema.Types.ObjectId;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
