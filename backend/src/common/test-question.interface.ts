import { IQustionAnswer } from './question-answer.interface';

export interface ITestQuestion {
  question: string;
  answers: IQustionAnswer[];
}
