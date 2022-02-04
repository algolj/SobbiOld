import { IRoomUserResponce } from './roomUserResponce.interface';

export interface IRoomResponce {
  name: string;
  date: Date;
  interviewee: IRoomUserResponce | IRoomUserResponce[];
  interviewer: IRoomUserResponce | IRoomUserResponce[];
  watcher: IRoomUserResponce | IRoomUserResponce[];
}
