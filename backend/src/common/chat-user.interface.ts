import { IRoomAuthUser } from '@app/room/types/roomAuthUser.interface';

export interface chatUser extends IRoomAuthUser {
  name: string;
  image: string;
}
