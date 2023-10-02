/* eslint-disable @typescript-eslint/ban-types */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JWTService } from '../jwt.service';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from 'src/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JWTService,
    public readonly configurationService: ConfigurationService,
    public readonly usersService: UsersService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configurationService.JWT_SECRET_KEY,
      },
      // async (req, payload, next) => await this.verify(req, payload, next),
    );
    // passport.use(this);
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.email);
    delete user.password;
    return user;
  }
}
