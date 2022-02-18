import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWTRoomConfig } from '@app/configs/jwt-room.config';
import { RoomUserEntity } from '@app/room/room-user.entity';
import { RoomEntity } from '@app/room/room.entity';
import { RoomLiveCodingGateway } from './room-live-coding.gateway';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity, RoomUserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JWTRoomConfig,
    }),
    PassportModule,
  ],
  providers: [RoomLiveCodingGateway],
})
export class RoomLiveCodingModule {}
