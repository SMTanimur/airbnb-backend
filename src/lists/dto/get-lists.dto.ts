import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export enum QueryListsClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  ORDERS = 'orders_count',
  PRODUCTS = 'products_count',
}

export class GetListsDto extends PaginationArgs {
  @IsEnum(QueryListsClassesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryListsClassesOrderByColumn })
  @IsOptional()
  orderBy?: QueryListsClassesOrderByColumn =
    QueryListsClassesOrderByColumn.CREATED_AT;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  host: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  locationValue: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  guestCount: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  roomCount: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  bathroomCount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  endDate: string;
}
export class GetMyListsDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  search?: string;

  ownerId: string;
}
