import { IUser } from '@app/common/user.interface';
import { User } from '@app/decorators/user.decorator';
import { JwtUserGuard } from '@app/user/guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtUserGuard)
  @Get()
  async getuserProfile(@User() user: IUser) {
    return user;
  }
}
