import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import { createHash } from 'src/utils/hash';
import { pick } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: PaginateModel<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async me(user: any): Promise<User> {
    return this.userModel
      .findOne({
        _id: user._id,
      })
      .populate(['addresses']);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      ...createUserDto,
    };
    // const createUserData = {
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   password: user.password,
    //   profile: user.profile,
    // };
    const userRegistered = await this.userModel.findOne({
      email: user.email,
    });
    if (!userRegistered) {
      const userData = new this.userModel(user);
      const password = await createHash(user.password);
      userData.password = password;
      return await userData.save();
    } else {
      throw new HttpException('Email is already taken.', HttpStatus.CONFLICT);
    }
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).populate(['addresses']);
  }
  async findUser(id: string) {
    return await this.userModel.findOne({ _id: id }).populate(['addresses']);
  }

  async findUserOne(query: object): Promise<UserDocument> {
    const user = await this.userModel.findOne(query);

    if (!user) return null;

    return user;
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).populate(['addresses']);
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password, role = 'user' } = loginDto;

    const user = await this.userModel.findOne({ email, role });

    if (!user) throw new NotFoundException('There is no user with this email.');

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('The password you entered is incorrect.');
    }
    if (user.role !== role)
      throw new UnauthorizedException('You are not authorized to login.');

    return pick(user.toJSON(), ['_id', 'email', 'name', 'role']);
  }

  async update(updateUserDto: UpdateUserDto) {
    const { userId } = updateUserDto;
    await this.userModel.findByIdAndUpdate(userId, {
      $set: updateUserDto,
    });
    return {
      message: 'successfully updated user',
    };
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id, { new: true });
  }
}
