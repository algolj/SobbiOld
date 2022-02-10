import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ERoomRole } from '@app/common/room-role.enum';
import { RoomUserEntity } from '@app/room/room-user.entity';
import { RoomEntity } from '@app/room/room.entity';
import { IRoomUserAndPassword } from '@app/room/types/roomUserAndPassword.interface';
import { changeTime, deleteRoom, subjectFromRole } from './constants';
import { ISendMail } from './types/send-mail.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private getUTCDateAndTime(fullDate: Date): { time: string; date: string } {
    const arrayUTCDate = new Date(fullDate)
      .toUTCString()
      .split(' ')
      .slice(1, -1);

    const date = arrayUTCDate.splice(0, 3).join(' ');
    const time = parseInt(arrayUTCDate[0]) + arrayUTCDate[0].slice(2, 5);

    return { time, date };
  }

  async sendMailAboutCreateRoom(
    room: RoomEntity,
    creator: IRoomUserAndPassword,
    interviewee: IRoomUserAndPassword,
    interviewer: IRoomUserAndPassword,
    watcher: IRoomUserAndPassword,
  ) {
    const { time, date } = this.getUTCDateAndTime(room.date);

    // Creator
    if ((creator.roomUser as RoomUserEntity).email) {
      await this.sendAnInvitationCreator(
        room.name,
        date,
        time,
        (creator.roomUser as RoomUserEntity).email,
        creator.roomPassword as string,
        interviewee,
        interviewer,
        watcher,
      );
    }

    // send email to Interviewee,Interviewers,Watchers
    await [
      { type: 'Interviewee', users: interviewee },
      { type: 'Interviewer', users: interviewer },
      { type: 'Watcher', users: watcher },
    ].forEach(async ({ type, users }) => {
      if (Array.isArray(users.roomUser)) {
        users.roomUser.forEach(async (user, i) =>
          user.email
            ? await this.sendAnInvitationPersonally(
                type as ERoomRole,
                room.name,
                date,
                time,
                user.email,
                users.roomPassword[i],
              )
            : '',
        );
      } else {
        if (users.roomUser.email)
          await this.sendAnInvitationPersonally(
            type as ERoomRole,
            room.name,
            date,
            time,
            users.roomUser.email,
            users.roomPassword as string,
          );
      }
    });
  }

  private async sendAnInvitationCreator(
    roomName: string,
    date: string,
    time: string,
    email: string,
    password: string,
    interviewee: IRoomUserAndPassword,
    interviewer: IRoomUserAndPassword,
    watcher: IRoomUserAndPassword,
  ) {
    const userInfo = (
      type: string,
      email: string,
      password: string,
      shortLink: string,
      index: string | number = '',
    ) => ({
      [type + index]: email || '',
      [`${type}Password${index}`]: password,
      [`${type}ShortLink${index}`]: shortLink,
    });

    const getInterviewerAndWatcher = () =>
      [
        { type: 'interviewer', users: interviewer },
        { type: 'watcher', users: watcher },
      ].reduce(
        (config, { type, users }) => ({
          ...(Array.isArray(users.roomUser)
            ? {
                ...userInfo(
                  type,
                  (users.roomUser as RoomUserEntity[]).splice(0, 1)[0].email,
                  (users.roomPassword as string[]).splice(0, 1)[0],
                  '',
                ),
                [type + 'Other']: JSON.stringify(
                  users.roomUser.map((user, i) =>
                    userInfo(type, user.email, users.roomPassword[i], '', i),
                  ),
                  null,
                  '  ',
                ).slice(1, -1),
              }
            : {
                ...userInfo(
                  type,
                  (users.roomUser as RoomUserEntity).email,
                  users.roomPassword as string,
                  '',
                ),
                [type + 'Other']: '',
              }),
          ...config,
        }),
        {},
      );
    const MailConfig = {
      to: email,
      from: `Vlad from Sobbi sobbi@algolj.it`,
      subject: subjectFromRole['Creator'],
      template: 'creator',
      context: {
        roomName,
        date,
        time,
        password,
        interviewee: (interviewee.roomUser as RoomUserEntity).email,
        intervieweePassword: interviewee.roomPassword,
        intervieweeShortLink: '',
        ...getInterviewerAndWatcher(),
      },
    };

    await this.sendMail(MailConfig);
  }

  private async sendAnInvitationPersonally(
    type: ERoomRole,
    roomName: string,
    date: string,
    time: string,
    email: string,
    password: string,
  ): Promise<void> {
    const MailConfig = {
      to: email,
      from: `${
        type == 'Interviewee' ? 'Vlad' : 'Alexander'
      } from Sobbi sobbi@algolj.it`,
      subject: subjectFromRole[type],
      template: type.toLowerCase(),
      context: {
        roomName,
        date,
        time,
        password,
        roomLink: '',
      },
    };

    await this.sendMail(MailConfig);
  }

  private getEmailAllUser(room: RoomEntity): string[] {
    return ['creator', 'interviewee', 'interviewer', 'watcher'].reduce(
      (acc, role) => {
        const users = room[role];

        if (Array.isArray(users)) {
          users.forEach((user) => {
            if (user.email) {
              acc.push(user.email);
            }
          });
        } else {
          if (users.email) {
            acc.push(users.email);
          }
        }

        return acc;
      },
      [],
    );
  }

  async sendMailAboutChangeDate(room: RoomEntity, newDate: Date) {
    const { time: oldTime, date: oldDate } = this.getUTCDateAndTime(room.date);
    const { time, date } = this.getUTCDateAndTime(newDate);

    const MailConfig = {
      to: this.getEmailAllUser(room),
      from: 'Alexander from Sobbi sobbi@algolj.it',
      subject: changeTime,
      template: 'change-time',
      context: {
        roomName: room.name,
        date,
        time,
        oldTime,
        oldDate,
      },
    };
    await this.sendMail(MailConfig);
  }

  async sendMailAboutDeleteRoom(room: RoomEntity) {
    const { time, date } = this.getUTCDateAndTime(room.date);

    const MailConfig = {
      to: this.getEmailAllUser(room),
      from: 'Alexander from Sobbi sobbi@algolj.it',
      subject: deleteRoom,
      template: 'delete-room',
      context: {
        roomName: room.name,
        date,
        time,
      },
    };
    await this.sendMail(MailConfig);
  }

  private async sendMail(mailOptions: ISendMail): Promise<void> {
    await this.mailerService.sendMail(mailOptions);
  }
}
