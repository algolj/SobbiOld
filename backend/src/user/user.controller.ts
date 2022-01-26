import { IAuth } from '@app/common/auth.interface';
import { User } from '@app/decorators/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtUserGuard } from './guards/jwt.guard';
import { TLogin } from './types/login.type';
import { IUser } from '../common/user.interface';
import { REGULAR_CHECK_IS_EMAIL } from './user.constants';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { TLoginKey } from './types/login-key.type';
import { IChangePassword } from './types/change-password.interface';

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
  async loginUser(@Body() draftLoginInfo: IAuth) {
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
  async deleteUser(@User() user: IUser) {
    return this.userService.deleteUser(user);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserGuard)
  @Put('change/email')
  @Put('change/username')
  async changeUserEmail(@User() user: IUser, @Body() newValue: TLoginKey) {
    return await this.userService.changeEmailOruserName(user, newValue);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserGuard)
  @Put('change/password')
  async changeUserPassword(
    @User() user: IUser,
    @Body() passwords: IChangePassword,
  ) {
    return await this.userService.changeUserPassword(user, passwords);
  }

  @Get('all')
  async d() {
    return this.userService.getAll();
  }
}
