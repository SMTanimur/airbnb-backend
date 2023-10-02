import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { User } from '../schema/user.schema';

export class UserPaginator extends Paginator<User> {
  data: User[];
}

export enum QueryUsersOrderByColumn {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class GetUsersDto extends PaginationArgs {
  @IsEnum(QueryUsersOrderByColumn)
  @ApiPropertyOptional({ enum: QueryUsersOrderByColumn })
  @IsOptional()
  orderBy?: QueryUsersOrderByColumn = QueryUsersOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  roles?: string;
}
