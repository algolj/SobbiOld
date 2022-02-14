import { IChanged } from '@app/common/changed.interface';
import { IDeleteResponce } from '@app/common/deleteResponce.interface';
import { ITokenResponce } from '@app/common/tokenResponce.interface';
import { IUser } from '@app/common/user.interface';
import { RoomUser } from '@app/decorators/room-user.decorator';
import { User } from '@app/decorators/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateRoomDto } from './dto/createRoom.dto';
import { loginRoomDto } from './dto/loginRoom.dto';
import { JwtUserInRoomGuard } from './guards/jwt.guard';
import { RoomService } from './room.service';
import { IAddUserInRoom } from './types/addUserInRoom.interface';
import { IDeleteRoomUser } from './types/deleteRoomUser.interface';
import { IRoomAuthUser } from './types/roomAuthUser.interface';
import { IRoomResponce } from './types/roomResponce.interface';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createRoom(
    @User() user: IUser,
    @Body() draftRoom: CreateRoomDto,
  ): Promise<IRoomResponce> {
    const room = { ...draftRoom };

    if (!room?.creator) {
      if (user?.username) {
        room.creator = user.username;
      } else {
        throw new HttpException(
          'creator should not be empty',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.roomService.createRoom(room);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async loginInRoom(@Body() authData: loginRoomDto): Promise<ITokenResponce> {
    return await this.roomService.authUserInRoom(authData);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserInRoomGuard)
  @Put('user')
  async changeName(
    @RoomUser() roomUser: IRoomAuthUser,
    @Body('name') name: string,
  ): Promise<IChanged> {
    return await this.roomService.changeNameInRoom(roomUser.userId, name);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserInRoomGuard)
  @Post('user')
  async addUser(
    @RoomUser() roomUser: IRoomAuthUser,
    @Body() newUser: IAddUserInRoom,
  ): Promise<IChanged> {
    return await this.roomService.addNewUser(roomUser, newUser);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserInRoomGuard)
  @Delete('user')
  async removableUserFromRoom(
    @RoomUser() roomUser: IRoomAuthUser,
    @Body() removableUser: IDeleteRoomUser,
  ): Promise<IDeleteResponce> {
    return await this.roomService.removableUserFromRoom(
      roomUser,
      removableUser,
    );
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserInRoomGuard)
  @Put('change/date/:id')
  async chageDate(
    @RoomUser() roomUser: IRoomAuthUser,
    @Param('id') roomId: string,
    @Body('date') date: string,
  ): Promise<IChanged> {
    return await this.roomService.changeDate(roomUser, roomId, date);
  }

  @Post('room-name-exists')
  async existsAuthData(
    @Body('name') name: string,
  ): Promise<{ exists: boolean }> {
    return await this.roomService.roomNameExists(name);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserInRoomGuard)
  @Delete(':id')
  async deleteRoom(
    @RoomUser() roomUser: IRoomAuthUser,
    @Param('id') roomId: string,
  ): Promise<IDeleteResponce> {
    return await this.roomService.deleteRoom(roomUser, roomId);
  }

  @Get()
  @UseGuards(JwtUserInRoomGuard)
  async getRoom(@RoomUser() roomUser: IRoomAuthUser) {
    return await this.roomService.getInfoRoom(roomUser);
  }

  // delete on release ⚠️
  @Get('user')
  async getUser() {
    return await this.roomService.getRoomUser();
  }

  // delete on release ⚠️
  // @Get('room/:name')
  // async getRoom(@Param('name') name: string) {
  //   return await this.roomService.getRoom(name);
  // }
}
