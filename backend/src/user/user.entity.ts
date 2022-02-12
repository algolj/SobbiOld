import { genSalt, hash } from 'bcryptjs';
import { Blob } from 'buffer';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ECountry } from '@app/common/country.enum';
import { EGender } from '@app/common/gender.enum';
import { ISocialMedia } from '@app/common/social-media.interface';
import { RoomUserEntity } from '@app/room/room-user.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ type: 'enum', enum: ECountry, nullable: true })
  country: ECountry;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: EGender, nullable: true })
  gender: EGender;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'json', nullable: true })
  socialMedia: ISocialMedia;

  @OneToMany(() => RoomUserEntity, (roomUser) => roomUser.userInRoom)
  rooms: RoomUserEntity[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
}
