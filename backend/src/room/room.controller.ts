import { IChanged } from '@app/common/changed.interface';
import { IDeleteResponce } from '@app/common/deleteResponce.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeDateDto } from './dto/changeDate.dto';

import { CreateRoomDto } from './dto/createRoom.dto';
import { RoomService } from './room.service';
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
  @Put('change/date/:id')
  async chageDate(
    @Param('id') roomId: string,
    @Body() newDate: ChangeDateDto,
  ): Promise<IChanged> {
    return await this.roomService.changeDate(roomId, newDate.date);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') roomId: string): Promise<IDeleteResponce> {
    return await this.roomService.deleteRoom(roomId);
  }

  @Get('user')
  async getUser() {
    return await this.roomService.getRoomUser();
  }

  @Get('room')
  async getRoom() {
    return await this.roomService.getRoom();
  }
}
