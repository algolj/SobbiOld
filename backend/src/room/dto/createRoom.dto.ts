import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  readonly interviewee: string;
  readonly interviewer: string | string[];
  readonly watcher: string | string[];
}
