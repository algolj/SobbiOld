import {
  ActionTypesRoomEnum,
  IAuthRoom,
  IRoom,
} from '../../../types/roomTypes';

export const createRoomAction = (room: IRoom) =>
  ({
    type: ActionTypesRoomEnum.CREATE_ROOM,
    payload: room,
  } as const);

export const enterRoomAction = (isAuthRoom: boolean) =>
  ({
    type: ActionTypesRoomEnum.ENTER_ROOM,
    payload: isAuthRoom,
  } as const);
