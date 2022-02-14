export interface IRoom {
  name: string;
  date: string;
  creator: string;
  interviewee: string[] | string;
  interviewer: string[] | string;
  watcher: string[] | string;
}

export enum RoomInputLabels {
  emailLabel = 'E-mail',
  roomName = 'Room Name',
  Interviewer = 'Interviewer',
  Interviewee = 'Interviewee',
  Spectators = 'Spectators',
  Date = 'Date',
  Time = 'Time',
}

export interface IRoomState {
  room: IRoom;
  error: null | string;
}

export enum ActionTypesRoom {
  CREATE_ROOM = 'CREATE_ROOM',
}
