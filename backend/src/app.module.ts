import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';
import { TasksModule } from './tasks/tasks.module';
import { TagsModule } from './tags/tags.module';
import { TestsModule } from './tests/tests.module';

import config from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({ isGlobal: true }),
    RoomModule,
    UserModule,
    ProfileModule,
    MailModule,
    TasksModule,
    TagsModule,
    TestsModule,
  ],
})
export class AppModule {}
