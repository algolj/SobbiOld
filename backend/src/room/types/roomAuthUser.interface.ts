import { ERoomRole } from '@app/common/room-role.enum';

export interface IRoomAuthUser {
  userId: number;
  roomId: number;
  role: ERoomRole;
}
