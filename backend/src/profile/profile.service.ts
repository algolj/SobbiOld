import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TLoginData } from '@app/user/types/login-data.type';
import { UserEntity } from '@app/user/user.entity';
import {
  NOT_CHANGE_EMAIL,
  NOT_CHANGE_PASSWORD,
  NOT_CHANGE_USERNAME,
} from './profile.constants';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserProfile(user: TLoginData): Promise<UserEntity> {
    return await this.userRepository.findOne(user);
  }

  async getProfile(id: string): Promise<UserEntity> {
    const findParam = /^id\d*$/.test(id)
      ? { id: +id.slice(2) }
      : { username: id };

    return await this.userRepository.findOne(findParam);
  }

  private isNotAuthData(user: TLoginData, newChanges: UserEntity) {
    if (newChanges.password !== undefined) {
      throw new HttpException(NOT_CHANGE_PASSWORD, HttpStatus.FORBIDDEN);
    }
    if (newChanges.username && newChanges.username !== user.username) {
      throw new HttpException(NOT_CHANGE_USERNAME, HttpStatus.FORBIDDEN);
    }
    if (newChanges.email && newChanges.email !== user.email) {
      throw new HttpException(NOT_CHANGE_EMAIL, HttpStatus.FORBIDDEN);
    }
  }

  async changeUserProfile(
    user: TLoginData,
    newChanges: UserEntity,
  ): Promise<UserEntity> {
    this.isNotAuthData(user, newChanges);

    const userData = await this.userRepository.findOne(user);

    Object.assign(userData, newChanges);

    return await this.userRepository.save(userData);
  }
}
