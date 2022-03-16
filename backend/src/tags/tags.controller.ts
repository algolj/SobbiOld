import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() {
    return await this.tagsService.getAllTag();
  }

  @Post()
  async saveTag(@Body('tag') tag: string) {
    return await this.tagsService.setTag(tag);
  }

  @Delete()
  async deleteTag(@Body('tag') tag: string) {
    return await this.tagsService.deleteTag(tag);
  }
}
