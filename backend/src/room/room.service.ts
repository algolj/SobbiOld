import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  NOT_ALLOWED_USERNAME,
  REGULAR_CHECK_IS_EMAIL,
  REGULAR_CHECK_IS_ID,
} from '@app/common/global.constants';
import { CreateRoomDto } from './dto/createRoom.dto';
import { RoomUserEntity } from './room-user.entity';
import { ROOM_NAME_ALREADY_EXISTS } from './room.constants';
import { RoomEntity } from './room.entity';
import { IRoomUser } from '../common/createRoomUser.interface';
import { UserEntity } from '@app/user/user.entity';
import { ICreateRoomUser } from './types/roomUser.interface';
import { IDeleteResponce } from '@app/common/deleteResponce.interface';
import { IRoomResponce } from './types/roomResponce.interface';
import { IRoomUserAndPassword } from './types/roomUserAndPassword.interface';
import { IRoomUserResponce } from './types/roomUserResponce.interface';
import { IChanged } from '@app/common/changed.interface';
import { MailService } from '@app/mail/mail.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(RoomUserEntity)
    private readonly roomUserRepository: Repository<RoomUserEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailService: MailService,
  ) {}

  private isEmail = (key: string): boolean => REGULAR_CHECK_IS_EMAIL.test(key);

  private async userAccount(userKey: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      [this.isEmail(userKey) ? 'email' : 'username']: userKey,
    });
  }

  private async createRoomUser(
    usersArr: IRoomUser,
  ): Promise<IRoomUserAndPassword> {
    const passwordGenerator = () =>
      (~~(Math.random() * Math.pow(36, 6))).toString(36);

    const createUser = async (userKey: string) => {
      const user: ICreateRoomUser = {
        email: null,
        password: passwordGenerator(),
      };

      const userInDatabase = userKey
        ? await this.userAccount(userKey)
        : undefined;

      if (userInDatabase) {
        user.email = userInDatabase.email;
        user.userInRoom = userInDatabase;
      } else {
        if (this.isEmail(userKey)) {
          user.email = userKey;
        }
      }

      const currentUser = new RoomUserEntity();
      Object.assign(currentUser, user);

      return {
        user: await this.roomUserRepository.save(currentUser),
        password: user.password,
      };
    };

    const createdUser = {
      roomUser: undefined,
      roomPassword: undefined,
    };

    if (usersArr.users && Array.isArray(usersArr.users)) {
      createdUser.roomUser = [];
      createdUser.roomPassword = [];

      for (const user of usersArr.users) {
        const currentUser = await createUser(user);

        createdUser.roomUser.push(currentUser.user);
        createdUser.roomPassword.push(currentUser.password);
      }
    } else {
      const currentUser = await createUser(
        usersArr.users ? (usersArr.users as string) : '',
      );

      createdUser.roomUser = currentUser.user;
      createdUser.roomPassword = currentUser.password;
    }

    return createdUser;
  }

  private async isUniqueRoomName(name: string): Promise<void> {
    const foundRoom = await this.roomRepository.findOne({ name });

    if (foundRoom) {
      throw new HttpException(
        ROOM_NAME_ALREADY_EXISTS,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (REGULAR_CHECK_IS_ID.test(name)) {
      throw new HttpException(NOT_ALLOWED_USERNAME, HttpStatus.BAD_REQUEST);
    }
  }

  private roomResultConvertor(
    room: RoomEntity,
    creator: IRoomUserAndPassword,
    interviewee: IRoomUserAndPassword,
    interviewer: IRoomUserAndPassword,
    watcher: IRoomUserAndPassword,
  ): IRoomResponce {
    const userResponceConvertor = (
      user: RoomUserEntity,
      password: string,
    ): IRoomUserResponce => {
      const currentUser: IRoomUserResponce = {
        username: '',
        email: '',
        password,
      };

      if (user?.userInRoom?.username) {
        currentUser.username = user.userInRoom.username;
      } else {
        if (user.email) currentUser.email = user.email;
      }

      return currentUser;
    };

    const usersConvertor = (usersArr: IRoomUserAndPassword) =>
      typeof usersArr.roomPassword === 'string' &&
      !Array.isArray(usersArr.roomUser)
        ? userResponceConvertor(usersArr.roomUser, usersArr.roomPassword)
        : (usersArr.roomUser as Array<RoomUserEntity>).map((user, i) =>
            userResponceConvertor(user, usersArr.roomPassword[i]),
          );

    return {
      name: room.name,
      date: room.date,
      creator: usersConvertor(creator),
      interviewee: usersConvertor(interviewee),
      interviewer: usersConvertor(interviewer),
      watcher: usersConvertor(watcher),
    };
  }

  async createRoom(requestRoom: CreateRoomDto): Promise<IRoomResponce> {
    await this.isUniqueRoomName(requestRoom.name);

    const creator = await this.createRoomUser({
      users: Array.isArray(requestRoom.creator)
        ? requestRoom.creator[0]
        : requestRoom.creator,
    });

    const interviewee = await this.createRoomUser({
      users: Array.isArray(requestRoom.interviewee)
        ? requestRoom.interviewee[0]
        : requestRoom.interviewee,
    });

    const interviewer = await this.createRoomUser({
      users: requestRoom.interviewer,
    });

    const watcher = await this.createRoomUser({
      users: requestRoom.watcher,
    });

    const room = new RoomEntity();

    const converterToArray = (users) =>
      Array.isArray(users) ? users : [users];

    Object.assign(room, {
      name: requestRoom.name,
      date: requestRoom.date,
      creator: creator.roomUser,
      interviewee: interviewee.roomUser,
      interviewer: converterToArray(interviewer.roomUser),
      watcher: converterToArray(watcher.roomUser),
    });

    const createdRoom = await this.roomRepository.save(room);

    // sending out invitations
    await this.mailService.sendMailAboutCreateRoom(
      createdRoom,
      creator,
      interviewee,
      interviewer,
      watcher,
    );

    return this.roomResultConvertor(
      createdRoom,
      creator,
      interviewee,
      interviewer,
      watcher,
    );
  }

  async getRoom() {
    return await this.roomRepository.find();
  }

  async deleteRoom(roomId: string): Promise<IDeleteResponce> {
    const key = REGULAR_CHECK_IS_ID.test(roomId)
      ? {
          id: +roomId.slice(2),
        }
      : {
          name: roomId,
        };

    return {
      delete:
        roomId &&
        !!(await this.roomRepository.remove(
          await this.roomRepository.findOne(key),
        )),
    };
  }

  async changeDate(roomId: string, newDate: string): Promise<IChanged> {
    const key = REGULAR_CHECK_IS_ID.test(roomId)
      ? {
          id: +roomId.slice(2),
        }
      : {
          name: roomId,
        };

    const room = await this.roomRepository.findOne(key);

    room.date = new Date(newDate);

    return {
      changed: roomId && !!(await this.roomRepository.save(room)),
    };
  }

  async getRoomUser() {
    return await this.roomUserRepository.find();
  }
}
