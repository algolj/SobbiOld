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
import { CreateTestDto } from './dto/createTest.dto';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  async getAllTasks() {
    return await this.testsService.getAllTests();
  }

  @Get('/:id')
  async getTask(@Param('id') id: string | number) {
    return await this.testsService.getTest(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async saveTask(@Body() task: CreateTestDto) {
    return await this.testsService.setTest(task);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string | number) {
    return await this.testsService.deleteTest(id);
  }
}
