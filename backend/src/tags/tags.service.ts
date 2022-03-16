import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsEntity } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
  ) {}

  async setTag(tag: string) {
    const newTag = new TagsEntity();
    newTag.tag = tag;
    return { set: !!(await this.tagsRepository.save(newTag)) };
  }

  async getAllTag() {
    return await this.tagsRepository.find();
  }

  async deleteTag(tag: string) {
    return { delete: !!(await this.tagsRepository.delete({ tag })).affected };
  }
}
