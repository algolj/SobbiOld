import { IRoomUserResponce } from './roomUserResponce.interface';

export interface IRoomResponce {
  name: string;
  date: Date;
  creator: IRoomUserResponce | IRoomUserResponce[];
  interviewee: IRoomUserResponce | IRoomUserResponce[];
  interviewer: IRoomUserResponce | IRoomUserResponce[];
  watcher: IRoomUserResponce | IRoomUserResponce[];
}
