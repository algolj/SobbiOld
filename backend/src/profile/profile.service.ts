import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import path = require('path');
import fs = require('fs');

import { TLoginData } from '@app/user/types/login-data.type';
import { UserEntity } from '@app/user/user.entity';
import {
  NOT_CHANGE_EMAIL,
  NOT_CHANGE_PASSWORD,
  NOT_CHANGE_USERNAME,
  PROFILE_IMG_PATH,
} from './profile.constants';
import { REGULAR_CHECK_IS_ID } from '@app/common/global.constants';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserProfile(user: TLoginData): Promise<UserEntity> {
    return await this.userRepository.findOne(user);
  }

  private findParam = (id) =>
    REGULAR_CHECK_IS_ID.test(id) ? { id: +id.slice(2) } : { username: id };

  async getProfile(id: string): Promise<UserEntity> {
    const findParam = this.findParam(id);

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

  async addProfileImage(userEmail, filename) {
    const user = await this.userRepository.findOne({ email: userEmail });

    if (user.image) {
      try {
        fs.unlinkSync(`${PROFILE_IMG_PATH}/${user.image}`);
      } catch (err) {
        console.error('Profile img removed error: ', err);
      }
    }

    user.image = filename;

    return (await this.userRepository.save(user)).image;
  }

  async getProfileImage(id: string) {
    return await (
      await this.userRepository.findOne(this.findParam(id))
    ).image;
  }
}
