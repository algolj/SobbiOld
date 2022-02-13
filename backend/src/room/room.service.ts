import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import {
  NOT_ALLOWED_USERNAME,
  REGULAR_CHECK_IS_EMAIL,
  REGULAR_CHECK_IS_ID,
} from '@app/common/global.constants';
import { CreateRoomDto } from './dto/createRoom.dto';
import { RoomUserEntity } from './room-user.entity';
import {
  ROOM_NAME_ALREADY_EXISTS,
  ROOM_NAME_OR_PASSWORD_INCORRECT,
} from './room.constants';
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
import { loginRoomDto } from './dto/loginRoom.dto';
import { ERoomRole } from '@app/common/room-role.enum';
import { compare } from 'bcryptjs';
import { ITokenResponce } from '@app/common/tokenResponce.interface';
import { IRoomAuthUser } from './types/roomAuthUser.interface';
import { IDeleteRoomUser } from './types/deleteRoomUser.interface';
import { IAddUserInRoom } from './types/addUserInRoom.interface';

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
    private readonly jwtService: JwtService,
  ) {}

  private isEmail = (key: string): boolean => REGULAR_CHECK_IS_EMAIL.test(key);
  private passwordGenerator = () =>
    (~~(Math.random() * Math.pow(36, 6))).toString(36);

  private async userAccount(userKey: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      [this.isEmail(userKey) ? 'email' : 'username']: userKey,
    });
  }

  private async createRoomUser(
    usersArr: IRoomUser,
  ): Promise<IRoomUserAndPassword> {
    const createUser = async (userKey: string) => {
      const user: ICreateRoomUser = {
        email: null,
        password: this.passwordGenerator(),
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
    try {
      await this.mailService.sendMailAboutCreateRoom(
        createdRoom,
        creator,
        interviewee,
        interviewer,
        watcher,
      );
    } catch (e) {
      console.error('Mail error', e);
    }

    return this.roomResultConvertor(
      createdRoom,
      creator,
      interviewee,
      interviewer,
      watcher,
    );
  }

  async getRoom(name: string) {
    return await this.roomRepository.findOne({ name });
  }

  async deleteRoom(
    roomUser: IRoomAuthUser,
    roomName: string,
  ): Promise<IDeleteResponce> {
    const room = await this.getCreatorsRoom(roomName, roomUser.userId);

    const deleteRoom =
      room && !!(await this.roomRepository.remove(room as RoomEntity));

    if (deleteRoom) {
      try {
        await this.mailService.sendMailAboutDeleteRoom(room as RoomEntity);
      } catch (e) {
        console.error('Mail send error', e);
      }
    }

    return {
      delete: deleteRoom,
    };
  }

  async getCreatorsRoom(
    roomName: string,
    userId: number,
  ): Promise<RoomEntity | boolean> {
    const key = REGULAR_CHECK_IS_ID.test(roomName)
      ? {
          id: +roomName.slice(2),
        }
      : {
          name: roomName,
        };

    const room = await this.roomRepository.findOne(key);

    const user = await this.roomUserRepository.findOne({ id: userId });

    return room.creator.email === user.email && room;
  }

  async changeDate(
    roomUser: IRoomAuthUser,
    roomName: string,
    newDate: string,
  ): Promise<IChanged> {
    const room = await this.getCreatorsRoom(roomName, roomUser.userId);

    const changed =
      room &&
      !!(await this.roomRepository.save({
        ...(room as RoomEntity),
        date: new Date(newDate),
      }));

    if (changed) {
      try {
        await this.mailService.sendMailAboutChangeDate(
          room as RoomEntity,
          new Date(newDate),
        );
      } catch (e) {
        console.error('Mail send error ', e);
      }
    }

    return {
      changed,
    };
  }

  async getRoomUser() {
    return await this.roomUserRepository.find();
  }

  private async whatIsTheRole(
    room: RoomEntity,
    password: string,
  ): Promise<Omit<IRoomAuthUser, 'roomId'> | null> {
    const isCorrectPassword = async (hash) => await compare(password, hash);

    const roles = ['creator', 'interviewee', 'interviewer', 'watcher'];

    for (const role of roles) {
      const users = room[role];

      if (Array.isArray(users)) {
        for (const user of users) {
          const result = await isCorrectPassword(user.password);
          if (result) return { role: role as ERoomRole, userId: user.id };
        }
      } else {
        const result = await isCorrectPassword(users.password);
        if (result) return { role: role as ERoomRole, userId: users.id };
      }
    }

    return null;
  }

  async validateUserInRoom(loginData: loginRoomDto): Promise<IRoomAuthUser> {
    const notAuth = () => {
      throw new HttpException(
        ROOM_NAME_OR_PASSWORD_INCORRECT,
        HttpStatus.UNAUTHORIZED,
      );
    };

    const room =
      (await this.roomRepository.findOne({ name: loginData.room }, {})) ||
      notAuth();

    const userRole =
      (await this.whatIsTheRole(room, loginData.password)) || notAuth();

    return { roomId: room.id, ...userRole };
  }

  async authUserInRoom(loginData: loginRoomDto): Promise<ITokenResponce> {
    const authData = await this.validateUserInRoom(loginData);
    return { token: await this.jwtService.signAsync(authData) };
  }

  async changeNameInRoom(userId: number, name: string): Promise<IChanged> {
    const user = await this.roomUserRepository.findOne({ id: userId });

    user.name = name;

    return { changed: (await this.roomUserRepository.save(user)).name == name };
  }

  async removableUserFromRoom(
    user: IRoomAuthUser,
    removableUser: IDeleteRoomUser,
  ): Promise<IDeleteResponce> {
    const room = await this.roomRepository.findOne({ id: user.roomId });

    let removableUserData;

    const deleteUserInRoom = async (roleInRoom, userInRoom) => {
      userInRoom = userInRoom || null;
      const key =
        userInRoom == null || Number.isNaN(+userInRoom) ? 'email' : 'id';

      if (Array.isArray(room[roleInRoom])) {
        removableUserData = room[roleInRoom].find(
          (userWithRole) => userWithRole[key] == userInRoom,
        );
        room[roleInRoom].splice(
          room[roleInRoom].findIndex(
            (userWithRole) => userWithRole[key] === userInRoom,
          ),
          1,
        );
      } else {
        if (room[roleInRoom][key] == userInRoom) {
          removableUserData = room[roleInRoom];
          const newUser = new RoomUserEntity();
          newUser.password = this.passwordGenerator();
          room[roleInRoom] = await this.roomUserRepository.save(newUser);
        }
      }
    };

    if (user.role.toLowerCase() == 'creator') {
      await deleteUserInRoom(removableUser.role, removableUser.user);
    } else {
      await deleteUserInRoom(user.role, user.userId);
    }

    const deleteUser =
      (await this.roomRepository.save(room)) &&
      !!(await this.roomUserRepository.delete(removableUserData)).affected;

    if (deleteUser) {
      try {
        await this.mailService.sendMailCreatorAboutDeleteUser(
          room.name,
          new Date(room.date),
          room.creator.email,
          removableUserData.email || ' ',
        );

        if (removableUserData.email) {
          await this.mailService.sendMailAboutDeleteUser(
            room.name,
            new Date(room.date),
            removableUserData.email || ' ',
          );
        }
      } catch (e) {
        console.error('Mail error', e);
      }
    }

    return {
      delete: deleteUser,
    };
  }

  async addNewUser(
    creatorDraft: IRoomAuthUser,
    newUser: IAddUserInRoom,
  ): Promise<IChanged> {
    let changed = false;
    let user;

    const room = await this.roomRepository.findOne({ id: creatorDraft.roomId });

    const creator = await this.roomUserRepository.findOne({
      id: creatorDraft.userId,
    });

    if (
      room.creator.email === creator.email &&
      newUser.role.toLowerCase() !== 'creator'
    ) {
      user = await this.createRoomUser({
        users: newUser.user,
        role: newUser.role,
      });

      room[newUser.role] = Array.isArray(room[newUser.role])
        ? [...room[newUser.role], user.roomUser]
        : user.roomUser;

      changed = !!(await this.roomRepository.save(room));
    }

    if (changed && user.roomUser.email) {
      try {
        await this.mailService.addNewUser(
          newUser.role,
          room,
          user.roomUser.email,
          user.roomPassword,
        );
      } catch (e) {
        console.error('Mail send error', e);
      }
    }

    return { changed };
  }
}
