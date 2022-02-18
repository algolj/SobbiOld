import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import { IRoomAuthUser } from '@app/room/types/roomAuthUser.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomUserEntity } from '@app/room/room-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class socketRoomUserGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(RoomUserEntity)
    private readonly roomUserRepository: Repository<RoomUserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context
      .switchToWs()
      .getClient()
      .handshake.headers.authorization.split(' ')[1];
    if (typeof token === 'undefined') {
      throw new WsException('Missing token');
    }
    try {
      const { roomId, role, userId } = (await verify(
        token,
        this.configService.get('JWT_SECRET'),
      )) as IRoomAuthUser;

      const user = await this.roomUserRepository.findOne({ id: userId });

      context.switchToWs().getClient().user = {
        roomId,
        role,
        userId,
        name:
          user.name ||
          user?.userInRoom.username ||
          user?.userInRoom.firstName ||
          user.email,
        image: user?.userInRoom.image,
      };
    } catch (err) {
      context.switchToWs().getClient().user = null;
    }

    if (!context.switchToWs().getClient().user) {
      throw new WsException('UNAUTHORIZED');
    }

    return true;
  }
}
