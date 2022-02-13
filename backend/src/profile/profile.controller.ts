import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');

import { IUser } from '@app/common/user.interface';
import { User } from '@app/decorators/user.decorator';
import { JwtUserGuard } from '@app/user/guards/jwt.guard';
import { UserEntity } from '@app/user/user.entity';
import { ProfileService } from './profile.service';
import { PROFILE_IMG_PATH } from './profile.constants';
import { join } from 'path';
import { of } from 'rxjs';

const uniqGenerator = () => (~~(Math.random() * Math.pow(36, 6))).toString(36);
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

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserGuard)
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, fl, next) => {
        next(null, /^image\//.test(fl.mimetype));
      },
      storage: diskStorage({
        destination: PROFILE_IMG_PATH,
        filename: (req, fl, next) => {
          const filename = `pr-img-${uniqGenerator()}-${uniqGenerator()}-${Date.now()}`;
          const extension = path.parse(fl.originalname).ext;
          next(null, filename + extension);
        },
      }),
    }),
  )
  async addProfileImage(@User() { email }: IUser, @UploadedFile() file) {
    return {
      path: file
        ? await this.profileService.addProfileImage(email, file.filename)
        : '',
    };
  }

  // @Get('/image/:id')
  // async getProfileImage(@Param('id') userId: string, @Res() res) {
  //   return of(
  //     await res.sendFile(
  //       join(
  //         process.cwd(),
  //         PROFILE_IMG_PATH,
  //         await this.profileService.getProfileImage(userId),
  //       ),
  //     ),
  //   );
  // }

  @Get('/image/:imgname')
  async getProfileImage(@Param('imgname') imgname: string, @Res() res) {
    return of(
      await res.sendFile(join(process.cwd(), PROFILE_IMG_PATH, imgname)),
    );
  }

  @Get(':id')
  async getProfile(@Param('id') userId: string): Promise<UserEntity> {
    return await this.profileService.getProfile(userId);
  }
}
