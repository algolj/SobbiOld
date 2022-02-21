import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTask();
  }

  @Get('/:id')
  async getTask(@Param('id') id: string | number) {
    return await this.tasksService.getTask(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async saveTask(@Body() task: CreateTaskDto) {
    return await this.tasksService.setTask(task);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string | number) {
    return await this.tasksService.deleteTask(id);
  }
}
