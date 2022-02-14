import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtUserGuard } from './guards/jwt.guard';

import { IAuth } from '@app/common/auth.interface';
import { User } from '@app/decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { TLogin } from './types/login.type';
import { IUser } from '../common/user.interface';
import { REGULAR_CHECK_IS_EMAIL } from '@app/common/global.constants';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { TLoginKey } from './types/login-key.type';
import { IChangePassword } from './types/change-password.interface';
import { IDeleteResponce } from '@app/common/deleteResponce.interface';
import { ITokenResponce } from '@app/common/tokenResponce.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(newUser);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async loginUser(@Body() draftLoginInfo: IAuth): Promise<ITokenResponce> {
    const authKey = REGULAR_CHECK_IS_EMAIL.test(draftLoginInfo.login)
      ? 'email'
      : 'username';

    const loginInfo: TLogin = {
      [authKey]: draftLoginInfo.login,
      password: draftLoginInfo.password,
    } as TLogin;

    const user = await this.userService.validateUser(loginInfo);

    return await this.userService.loginUser(user);
  }

  @UseGuards(JwtUserGuard)
  @Delete()
  async deleteUser(@User() user: IUser): Promise<IDeleteResponce> {
    return this.userService.deleteUser(user);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserGuard)
  @Put('change/email')
  async changeUserEmail(
    @User() user: IUser,
    @Body() newValue: TLoginKey,
  ): Promise<ITokenResponce> {
    return await this.userService.changeEmailOruserName(user, newValue);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserGuard)
  @Put('change/password')
  async changeUserPassword(
    @User() user: IUser,
    @Body() passwords: IChangePassword,
  ): Promise<UserEntity> {
    return await this.userService.changeUserPassword(user, passwords);
  }

  @Post('auth-data-exists')
  async existsAuthData(
    @Body() authKay: TLoginKey,
  ): Promise<{ exists: boolean }> {
    return await this.userService.emailOrUsernameExists(authKay);
  }

  // delete on release ⚠️
  @Get('all')
  async dd() {
    return await this.userService.getAllUser();
  }
}
