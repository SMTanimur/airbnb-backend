/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { AccountActivateDto } from './dto/account-activate.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { AuthGuard } from '@nestjs/passport';
import { JWTService } from './jwt.service';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    public readonly configurationService: ConfigurationService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwt: JWTService,
  ) {}

  @ApiOperation({ summary: 'Register New User' })
  @ApiOkResponse({ description: 'Register user' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    const user = pick(data, ['_id', 'email', 'name', 'role']);
    const { access_token, expires_in } = await this.jwt.createToken(
      user.email,
      user.role,
    );
    return {
      message: `Welcome to Airbnb! 🎉`,
      user: user,
      token: access_token,
      expires_in,
    };
  }

  @ApiOperation({ summary: 'Logs user into the system' })
  @ApiOkResponse({ description: 'Logged in successfully.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() _body: LoginDto) {
    return await this.authService.validateLogin(_body);
  }

  @ApiOperation({ summary: 'User Logout Attempt' })
  @ApiOkResponse({
    description: 'User logout successfully.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout() {
    return { message: 'Logout Success' };
  }
}
