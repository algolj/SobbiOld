import { TLoginKey } from './login-key.type';

export type TLogin = TLoginKey & {
  password: string;
};
