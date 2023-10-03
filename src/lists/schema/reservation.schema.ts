import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { User } from 'src/users/schema/user.schema';

export interface ReservationSchema
  extends Document,
    mongoose.Types.Subdocument,
    Reservation {}

@Schema({ timestamps: true })
export class Reservation {
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @IsNumber()
  price: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  @IsString()
  locationValue: string;

  @ApiProperty({ required: true })
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  host: User;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);
