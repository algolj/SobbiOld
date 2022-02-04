import { RoomUserEntity } from '../room-user.entity';

export interface IRoomUserAndPassword {
  roomUser: RoomUserEntity | RoomUserEntity[];
  roomPassword: string | string[];
}
