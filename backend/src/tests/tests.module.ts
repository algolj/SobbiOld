import { TagsEntity } from '@app/tags/tags.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsController } from './tests.controller';
import { TestsEntity } from './tests.entity';
import { TestsService } from './tests.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestsEntity, TagsEntity])],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
