import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

import config from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({ isGlobal: true }),
    RoomModule,
    UserModule,
    ProfileModule,
  ],
})
export class AppModule {}
