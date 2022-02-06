import { MailModule } from '@app/mail/mail.module';
import { UserEntity } from '@app/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUserEntity } from './room-user.entity';

import { RoomController } from './room.controller';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([RoomEntity, RoomUserEntity, UserEntity]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
