import { TagsEntity } from '@app/tags/tags.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestsEntity } from './tests.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly testsRepository: Repository<TestsEntity>,
    @InjectRepository(TagsEntity)
    private readonly tagsEntity: Repository<TagsEntity>,
  ) {}

  private async getTag(tag: string) {
    return this.tagsEntity.findOne({ tag });
  }

  async setTest(test) {
    const newTest = new TestsEntity();
    Object.assign(newTest, test);

    const tags = [];
    if (Array.isArray(test.tags)) {
      for (const tag of test.tags) {
        tags.push(await this.getTag(tag));
      }
    } else {
      tags.push(await this.getTag(test.tags));
    }

    newTest.tags = tags;

    return { set: !!(await this.testsRepository.save(newTest)) };
  }

  async getAllTests() {
    return await this.testsRepository.find();
  }

  async getTest(id: string | number) {
    return await this.testsRepository.findOne({
      [Number.isNaN(+id) ? 'title' : 'id']: id,
    });
  }

  async deleteTest(id: string | number) {
    return {
      delete: !!(
        await this.testsRepository.delete({
          [Number.isNaN(+id) ? 'title' : 'id']: id,
        })
      ).affected,
    };
  }
}
