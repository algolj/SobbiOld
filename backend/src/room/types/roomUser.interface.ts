import { UserEntity } from '@app/user/user.entity';
import { RoomEntity } from '../room.entity';

export interface ICreateRoomUser {
  id?: number;
  email: string;
  name?: string;
  password: string;
  userInRoom?: UserEntity;

  interviewerRoom?: RoomEntity;

  watcherRoom?: RoomEntity;
}
