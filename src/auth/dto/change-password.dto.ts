import { IsOptional, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
  @IsOptional()
  user: any;
}
