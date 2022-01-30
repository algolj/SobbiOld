import * as UserActions from '../store/reducers/userReducer/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypesUsers = ReturnType<InferValueTypes<typeof UserActions>>;

export interface IAuthResponse {
  token: string;
  data: ILoginUser[];
}

export interface INewUser {
  username: string;
  email: string;
  password: string;
  last_name?: string;
  first_name?: string;
  country?: string;
  date_of_birth?: string;
  gender?: string;
  bio?: string;
  image?: string;
  socialMedia?: string;
  id?: 1;
}

export interface ILoginUser {
  login: string;
  password: string;
}

export interface IUserState {
  user: INewUser;
  isAuth: boolean;
  error: null | string;
}

export enum UsersActionType {
  CREATE_USER = 'CREATE_USER',
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
}
