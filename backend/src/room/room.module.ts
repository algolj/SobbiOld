import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWTConfig } from '@app/configs/jwt.config';
import { MailModule } from '@app/mail/mail.module';
import { UserEntity } from '@app/user/user.entity';

import { RoomUserEntity } from './room-user.entity';
import { RoomController } from './room.controller';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';
import { JWTSRoomUsertrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([RoomEntity, RoomUserEntity, UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JWTConfig,
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService, JWTSRoomUsertrategy],
})
export class RoomModule {}
