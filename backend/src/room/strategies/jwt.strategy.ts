import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IRoomAuthUser } from '../types/roomAuthUser.interface';

@Injectable()
export class JWTSRoomUsertrategy extends PassportStrategy(Strategy) {
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

  async validate({
    userId,
    roomId,
    role,
  }: IRoomAuthUser): Promise<IRoomAuthUser> {
    return { userId, roomId, role };
  }
}
