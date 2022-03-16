import { ELevelOfDifficulty } from '@app/common/level-of-difficulty.enum';
import { TagsEntity } from '@app/tags/tags.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TasksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ELevelOfDifficulty, nullable: false })
  hardLevel: ELevelOfDifficulty;

  @Column()
  code: string;

  @OneToMany(() => TagsEntity, (tagsEntity) => tagsEntity.tasks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tags: TagsEntity[];
}
