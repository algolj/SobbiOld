import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @IsNotEmpty()
  readonly creator: string;

  readonly interviewee: string;
  readonly interviewer: string | string[];
  readonly watcher: string | string[];
}
