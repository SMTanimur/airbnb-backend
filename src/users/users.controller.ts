import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  SerializeOptions,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Role } from 'src/common/constants/roles.enum';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard';
import { Roles } from 'src/common/guard/roles.decorators';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags(User.name)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'create a New User' })
  @ApiOkResponse({ description: 'Create a user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'User get his Profile' })
  @ApiOkResponse({ description: 'success' })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  // @Roles(Role.CUSTOMER, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  public async me(@Request() request) {
    return this.usersService.me(request.user);
  }
  @ApiOperation({ summary: 'User get his Profile' })
  @ApiOkResponse({ description: 'success' })
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.USER, Role.ADMIN)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiCreatedResponse({ description: 'User successfully updated' })
  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto, @Request() request) {
    updateUserDto.userId = request.user._id;
    return this.usersService.update(updateUserDto);
  }
}
