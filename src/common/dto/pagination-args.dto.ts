import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationArgs {
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public limit?: number = 15;
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public page?: number = 1;
}
