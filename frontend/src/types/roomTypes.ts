import * as RoomActions from '../store/reducers/roomReducer/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypesRoom = ReturnType<InferValueTypes<typeof RoomActions>>;

export interface IRoom {
  name: string;
  date: string;
  role?: string;
  time?: string;
  creator: IRoomUser;
  interviewee: IRoomUser[];
  interviewer: IRoomUser[];
  watcher: IRoomUser[];
}

export interface IRoomObject {
  room: IRoom;
}

export interface IRoomUser {
  name: string | null;
  email: string;
  password?: string;
}

export interface IAuthRoom {
  room: string;
  password: string;
}

export enum RoomInputLabels {
  creatorLabel = 'Creator',
  roomNameLabel = 'Room Name',
  InterviewerLabel = 'Interviewer',
  IntervieweeLabel = 'Interviewee',
  SpectatorsLabel = 'Spectators',
  DateLabel = 'Date',
  TimeLabel = 'Time',
}

export interface IRoomState {
  room: IRoom;
  isAuthRoom: boolean;
  isEditRoom: boolean;
  error: null | string;
}

export enum ActionTypesRoomEnum {
  CREATE_ROOM = 'CREATE_ROOM',
  ENTER_ROOM = 'ENTER_ROOM',
  IS_EDIT_ROOM = 'IS_EDIT_ROOM',
  GET_ROOM_INFO = 'GET_ROOM_INFO',
  CHANGE_ROOM_DATE = 'CHANGE_ROOM_DATE',
  CHANGE_ROOM_USERNAME = 'CHANGE_ROOM_USERNAME',
  ADD_INTERVIEWEE = 'ADD_INTERVIEWEE',
  ADD_INTERVIEWER = 'ADD_INTERVIEWER',
  ADD_WATCHER = 'ADD_WATCHER',
}

export interface IRoomForm {
  formDate: string;
  formUserName: string;
}

export interface INewUser {
  role: string;
  user: string;
}

export interface IDeleteUserRoom {
  role: string;
  user: string;
}

export enum InputLabels {
  interviewer = 'Interviewer',
  interviewee = 'Interviewee',
  watcher = 'Watcher',
}
