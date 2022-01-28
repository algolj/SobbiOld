import { IsDateString, IsNotEmpty } from 'class-validator';

export class ChangeDateDto {
  @IsNotEmpty()
  @IsDateString()
  readonly date: string;
}
