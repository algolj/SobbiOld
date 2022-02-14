import { IsNotEmpty } from 'class-validator';

export class loginRoomDto {
  @IsNotEmpty()
  readonly room: string;

  @IsNotEmpty()
  readonly password: string;
}
