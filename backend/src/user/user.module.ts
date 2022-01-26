import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWTConfig } from '@app/configs/jwt.config';

import { JWTStrategy } from './strategies/jwt.strategy';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JWTConfig,
    }),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, JWTStrategy],
})
export class UserModule {}
