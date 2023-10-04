import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/constants/roles.enum';
import { List } from 'src/lists/schema/list.schema';
import mongoose from 'mongoose';
import { Reservation } from 'src/reservations/schema/reservation.schema';

@Schema({ timestamps: true })
export class User {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsEmail()
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @IsOptional()
  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/smtanimur/image/upload/v1658841812/mushfiqTanim/user_qcrqny_kcgfes.svg',
  })
  avatar?: string;

  @IsString()
  @MinLength(7)
  @MaxLength(150)
  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  @Prop({
    enum: [Role.ADMIN, Role.USER],
    default: Role.USER,
    type: String,
  })
  role?: string;

  @ValidateNested()
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'List' }] })
  listings?: List[];

  @ValidateNested()
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Reservation' }] })
  reservations?: Reservation[];
}

export interface UserDocument extends User {
  comparePassword?(password: string): Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password);
};
