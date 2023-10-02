import { IsEnum } from 'class-validator';
import { Role } from 'src/common/constants/roles.enum';

export class UpdateUserPermissionsDto {
  @IsEnum(Role)
  public permissions: Role;
}
