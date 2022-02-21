import { TagsEntity } from '@app/tags/tags.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tests' })
export class TestsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'json' })
  questions: string;

  @OneToMany(() => TagsEntity, (tagsEntity) => tagsEntity.tasks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tags: TagsEntity[];
}
