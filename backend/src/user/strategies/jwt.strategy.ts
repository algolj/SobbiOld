import { IRoomAuthUser } from '@app/room/types/roomAuthUser.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TLoginData } from '../types/login-data.type';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: '1m',
      },
    });
  }

  async validate(req): Promise<IRoomAuthUser | TLoginData> {
    if (req.email && req.username)
      return { email: req.email, username: req.username };

    if (req.userId && req.roomId && req.role)
      return { userId: req.userId, roomId: req.roomId, role: req.role };
  }
}
