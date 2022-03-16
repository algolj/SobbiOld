import { TasksEntity } from '@app/tasks/tasks.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class TagsEntity {
  @PrimaryColumn({ unique: true })
  tag: string;

  @ManyToOne(() => TasksEntity, (tasks) => tasks.tags)
  tasks: TasksEntity[];
}
