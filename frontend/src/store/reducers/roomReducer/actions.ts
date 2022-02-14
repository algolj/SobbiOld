import { ActionTypesRoom, IRoom } from '../../../types/roomTypes';

export const createRoomAction = (room: IRoom) =>
  ({
    type: ActionTypesRoom.CREATE_ROOM,
    payload: room,
  } as const);
