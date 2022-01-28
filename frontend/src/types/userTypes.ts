import * as UserActions from '../store/reducers/userReducer/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypesUsers = ReturnType<InferValueTypes<typeof UserActions>>;

export interface INewUser {
  username: string;
  email: string;
  password: string;
}
export interface ILoginUser {
  login: string;
  password: string;
}

export interface IUserState {
  user: INewUser[];
  error: null | string;
}

export enum UsersActionType {
  CREATE_USER = 'CREATE_USER',
  LOGIN_USER = 'LOGIN_USER',
}
