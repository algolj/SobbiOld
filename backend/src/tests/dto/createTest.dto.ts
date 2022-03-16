import { ITestQuestion } from '@app/common/test-question.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly questions: ITestQuestion;

  @IsNotEmpty()
  readonly tags: string | string[];
}
