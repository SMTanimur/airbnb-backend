import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
