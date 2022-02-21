import { TagsEntity } from '@app/tags/tags.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksEntity } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    @InjectRepository(TagsEntity)
    private readonly tagsEntity: Repository<TagsEntity>,
  ) {}

  private async getTag(tag: string) {
    return this.tagsEntity.findOne({ tag });
  }

  async setTask(task: CreateTaskDto) {
    const newTasks = new TasksEntity();
    Object.assign(newTasks, task);

    const tags = [];
    if (Array.isArray(task.tags)) {
      for (const tag of task.tags) {
        tags.push(await this.getTag(tag));
      }
    } else {
      tags.push(await this.getTag(task.tags));
    }

    newTasks.tags = tags;

    return { set: !!(await this.taskRepository.save(newTasks)) };
  }

  async getAllTask() {
    return await this.taskRepository.find();
  }

  async getTask(id: string | number) {
    return await this.taskRepository.findOne({
      [Number.isNaN(+id) ? 'title' : 'id']: id,
    });
  }

  async deleteTask(id: string | number) {
    return {
      delete: !!(
        await this.taskRepository.delete({
          [Number.isNaN(+id) ? 'title' : 'id']: id,
        })
      ).affected,
    };
  }
}
