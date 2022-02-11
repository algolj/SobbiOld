import { IChanged } from '@app/common/changed.interface';
import { IDeleteResponce } from '@app/common/deleteResponce.interface';
import { ITokenResponce } from '@app/common/tokenResponce.interface';
import { RoomUser } from '@app/decorators/room-user.decorator';
import { JwtUserGuard } from '@app/user/guards/jwt.guard';
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
import { ChangeDateDto } from './dto/changeDate.dto';

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

  @UsePipes(new ValidationPipe())
  @Post()
  async createRoom(@Body() room: CreateRoomDto): Promise<IRoomResponce> {
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

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtUserInRoomGuard)
  @Delete(':id')
  async deleteRoom(
    @RoomUser() roomUser: IRoomAuthUser,
    @Param('id') roomId: string,
  ): Promise<IDeleteResponce> {
    return await this.roomService.deleteRoom(roomUser, roomId);
  }

  @Get('user')
  async getUser() {
    return await this.roomService.getRoomUser();
  }

  @Get('room/:name')
  async getRoom(@Param('name') name: string) {
    return await this.roomService.getRoom(name);
  }
}
