import { ERoomRole } from '@app/common/room-role.enum';

export interface IAddUserInRoom {
  user: string;
  role: ERoomRole;
}
