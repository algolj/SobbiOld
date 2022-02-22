import { ActionTypesRoomEnum, INewUser, IRoom } from '../../../types/roomTypes';

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

export const setIsEditRoomAction = (isEdit: boolean) =>
  ({
    type: ActionTypesRoomEnum.IS_EDIT_ROOM,
    payload: isEdit,
  } as const);

export const getRoomInfoAction = (room: IRoom) =>
  ({
    type: ActionTypesRoomEnum.GET_ROOM_INFO,
    payload: room,
  } as const);

export const changeRoomDateAction = (date: string) =>
  ({
    type: ActionTypesRoomEnum.CHANGE_ROOM_DATE,
    payload: date,
  } as const);

export const changeRoomUsernameAction = (username: string) =>
  ({
    type: ActionTypesRoomEnum.CHANGE_ROOM_USERNAME,
    payload: username,
  } as const);

export const addInterviewerAction = (user: INewUser) =>
  ({
    type: ActionTypesRoomEnum.ADD_INTERVIEWER,
    payload: user,
  } as const);

export const addIntervieweeAction = (user: INewUser) =>
  ({
    type: ActionTypesRoomEnum.ADD_INTERVIEWEE,
    payload: user,
  } as const);

export const addWatcherAction = (user: INewUser) =>
  ({
    type: ActionTypesRoomEnum.ADD_WATCHER,
    payload: user,
  } as const);
