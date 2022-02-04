import { ERoomRole } from '@app/common/room-role.enum';
import { RoomEntity } from '@app/room/room.entity';

export interface IRoomUser {
  users: string | string[];
  role?: ERoomRole;
  room?: RoomEntity;
}
