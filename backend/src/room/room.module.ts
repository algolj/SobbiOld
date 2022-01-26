import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
