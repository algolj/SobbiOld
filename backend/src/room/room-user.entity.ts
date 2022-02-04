import { genSalt, hash } from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@app/user/user.entity';
import { RoomEntity } from './room.entity';

@Entity({ name: 'room-user' })
export class RoomUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  @ManyToOne(() => UserEntity, (user) => user.rooms, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  userInRoom: UserEntity;

  @ManyToOne(() => RoomEntity, (user) => user.interviewer, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  interviewerRoom: RoomEntity;

  @ManyToOne(() => RoomEntity, (user) => user.watcher, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  watcherRoom: RoomEntity;
}
