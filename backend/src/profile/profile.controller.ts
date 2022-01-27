import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';

import { IUser } from '@app/common/user.interface';
import { User } from '@app/decorators/user.decorator';
import { JwtUserGuard } from '@app/user/guards/jwt.guard';
import { UserEntity } from '@app/user/user.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtUserGuard)
  @Get()
  async getUserProfile(@User() user: IUser): Promise<UserEntity> {
    return await this.profileService.getUserProfile(user);
  }

  @UseGuards(JwtUserGuard)
  @Put()
  async changeUserProfile(
    @User() user: IUser,
    @Body() newChanges: UserEntity,
  ): Promise<UserEntity> {
    return await this.profileService.changeUserProfile(user, newChanges);
  }

  @Get(':id')
  async getProfile(@Param('id') userId: string): Promise<UserEntity> {
    return await this.profileService.getProfile(userId);
  }
}
