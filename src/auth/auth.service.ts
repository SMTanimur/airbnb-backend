/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Role } from 'src/common/constants/roles.enum';
import * as bcrypt from 'bcryptjs';

import { ConfigurationService } from 'src/configuration/configuration.service';

import { JWTService } from './jwt.service';
import { pick } from 'lodash';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configurationService: ConfigurationService,
    private readonly jwtService: JWTService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validateUser(loginDto: LoginDto): Promise<any> {
    return await this.usersService.validateUser(loginDto);
  }

  async validateLogin(loginDto: LoginDto): Promise<{
    token: string;
    expires_in: string;
    user: object;
    message: string;
  }> {
    const { email, password, role = 'user' } = loginDto;
    const exitUser = await this.usersService.findOneByEmail(email);
    if (!exitUser) throw new NotFoundException('User not found');
    const user = await this.usersService.findUserOne({ email, role });

    if (!user)
      throw new UnprocessableEntityException(
        `This Email is not registered as a ${role}`,
      );

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('The password you entered is incorrect.');
    }

    const isValidPassword = await user.comparePassword(password);

    if (isValidPassword) {
      const { access_token, expires_in } = await this.jwtService.createToken(
        user.email,
        user.role,
      );
      const userInfo = pick(user, ['_id', 'email', 'name', 'role']);
      return {
        token: access_token,
        expires_in,
        user: userInfo,
        message: 'Welcome back! 🎉',
      };
    } else {
      throw new UnauthorizedException('The password you entered is incorrect.');
    }
  }

  async changePassword(changePasswordInput: ChangePasswordDto) {
    const isValidPass = await bcrypt.compare(
      changePasswordInput.oldPassword,
      changePasswordInput.user?.password,
    );
    if (isValidPass) {
      const password = await bcrypt.hash(changePasswordInput.newPassword, 10);
      await this.usersService.update({
        userId: changePasswordInput.user._id,
        password,
      });

      return {
        message: 'Password change successful',
      };
    } else {
      throw new HttpException(
        'Unable to change password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
