import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class AccountActivateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
