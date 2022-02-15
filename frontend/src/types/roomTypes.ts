import * as RoomActions from '../store/reducers/roomReducer/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypesRoom = ReturnType<InferValueTypes<typeof RoomActions>>;

export interface IRoom {
  name: string;
  date: string;
  creator: string;
  interviewee: string[] | string;
  interviewer: string[] | string;
  watcher: string[] | string;
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
  error: null | string;
}

export enum ActionTypesRoomEnum {
  CREATE_ROOM = 'CREATE_ROOM',
  ENTER_ROOM = 'ENTER_ROOM',
}
