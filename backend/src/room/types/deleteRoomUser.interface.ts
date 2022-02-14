import { ERoomRole } from '@app/common/room-role.enum';

export interface IDeleteRoomUser {
  role?: ERoomRole;
  user?: string;
}
