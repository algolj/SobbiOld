import { ELevelOfDifficulty } from '@app/common/level-of-difficulty.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly hardLevel: ELevelOfDifficulty;

  @IsNotEmpty()
  readonly code: string;

  @IsNotEmpty()
  readonly tags: string | string[];
}
