import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsDate } from 'class-validator';

export type ReservationSchema = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  endDate: Date;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsDate()
  startDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsMongoId()
  userId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ required: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsString()
  listingId: mongoose.Schema.Types.ObjectId;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
