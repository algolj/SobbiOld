import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoomUserEntity } from './room-user.entity';

@Entity({ name: 'room' })
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @OneToOne(() => RoomUserEntity, {
    eager: true,
  })
  @JoinColumn()
  creator: RoomUserEntity;

  @OneToOne(() => RoomUserEntity, {
    eager: true,
  })
  @JoinColumn()
  interviewee: RoomUserEntity;

  @OneToMany(() => RoomUserEntity, (roomUser) => roomUser.interviewerRoom, {
    eager: true,
    nullable: true,
  })
  interviewer: RoomUserEntity[];

  @OneToMany(() => RoomUserEntity, (roomUser) => roomUser.watcherRoom, {
    eager: true,
    nullable: true,
  })
  watcher: RoomUserEntity[];
}
