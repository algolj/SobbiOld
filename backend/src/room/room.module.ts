import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '@app/mail/mail.module';
import { UserEntity } from '@app/user/user.entity';

import { RoomUserEntity } from './room-user.entity';
import { RoomController } from './room.controller';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';
import { JWTRoomConfig } from '@app/configs/jwt-room.config';
import { PassportModule } from '@nestjs/passport';
import { getUserMiddleware } from '@app/user/middlewares/user.middleware';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([RoomEntity, RoomUserEntity, UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JWTRoomConfig,
    }),
    PassportModule,
    getUserMiddleware,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(getUserMiddleware).forRoutes({
      path: '/room',
      method: RequestMethod.POST,
    });
  }
}
