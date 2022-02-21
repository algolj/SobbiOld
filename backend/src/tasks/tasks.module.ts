import { TagsEntity } from '@app/tags/tags.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksEntity } from './tasks.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, TagsEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
