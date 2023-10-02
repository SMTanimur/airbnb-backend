import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'mushfiqurtanim@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ default: 'customer' })
  @IsOptional()
  @IsString()
  role?: string;
}
