import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import {
  EMAIL_ALREADY_EXISTS,
  EMAIL_OR_USER_WRONG,
  USERNAME_ALREADY_EXISTS,
} from './user.constants';
import { TLogin } from './types/login.type';
import { TLoginData } from './types/login-data.type';
import { IUser } from '@app/common/user.interface';
import { TLoginKey } from './types/login-key.type';
import { IChangePassword } from './types/change-password.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    await this.isEmailOrUserNameExists({
      email: createUserDto.email,
    });

    await this.isEmailOrUserNameExists({
      username: createUserDto.username,
    });

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  protected async getUserAuthData(data: {
    [key: string]: number | string;
  }): Promise<UserEntity> {
    return await this.userRepository.findOne(data, {
      select: ['username', 'email', 'password'],
    });
  }

  async validateUser(loginInfo: TLogin): Promise<TLoginData> {
    const authKey = { ...loginInfo };
    delete authKey.password;

    const wrongResult = () => {
      const infoText =
        Object.keys(authKey)[0][0].toLocaleUpperCase() +
        Object.keys(authKey)[0].slice(1) +
        EMAIL_OR_USER_WRONG;

      throw new HttpException(infoText, HttpStatus.UNAUTHORIZED);
    };

    const userInfo = await this.getUserAuthData(authKey);

    if (!userInfo) {
      wrongResult();
    }

    const isCorrectPassword = await compare(
      loginInfo.password,
      userInfo.password,
    );

    if (!isCorrectPassword) {
      wrongResult();
    }

    return { email: userInfo.email, username: userInfo.username };
  }

  async loginUser(loginData: TLoginData) {
    return { token: await this.jwtService.signAsync(loginData) };
  }

  async deleteUser(user: IUser) {
    return this.userRepository.delete(user);
  }

  async isEmailOrUserNameExists(authData: TLoginKey) {
    const user = await this.getUserAuthData(authData);

    if (user) {
      throw new HttpException(
        Object.keys(authData)[0] === 'email'
          ? EMAIL_ALREADY_EXISTS
          : USERNAME_ALREADY_EXISTS,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async changeEmailOruserName(user: IUser, newValue: TLoginKey) {
    await this.isEmailOrUserNameExists(newValue);

    const currentUser = await this.userRepository.findOne(user);

    Object.assign(currentUser, newValue);

    await this.userRepository.save(currentUser);

    return await this.loginUser({
      username: currentUser.username,
      email: currentUser.email,
    });
  }

  async changeUserPassword(user: IUser, passwords: IChangePassword) {
    const currentAuthData = await this.getUserAuthData({
      username: user.username,
    });

    const isCorrectPassword = await compare(
      passwords.oldPassword,
      currentAuthData.password,
    );

    if (!currentAuthData || !isCorrectPassword) {
      throw new HttpException(
        'User not found or old password incorrenct.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentUser = await this.userRepository.findOne(user);

    const salt = await genSalt();

    Object.assign(currentUser, {
      password: await hash(passwords.newPassword, salt),
    });

    return await this.userRepository.save(currentUser);
  }

  async getAll() {
    return this.userRepository.find();
  }
}
