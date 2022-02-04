import * as UserActions from '../store/reducers/userReducer/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypesUsers = ReturnType<InferValueTypes<typeof UserActions>>;

export interface IAuthResponse {
  token: string;
  data: ILoginUser[];
}

export interface ISocialMedia {
  linkedIn?: string;
  facebook?: string;
  github?: string;
}

export enum SocialMediaEnum {
  linkedIn = 'linkedIn',
  facebook = 'facebook',
  github = 'github',
}
export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  lastName?: string;
  firstName?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: string;
  bio?: string;
  image?: string;
  socialMedia?: ISocialMedia | null;
  id?: 1;
}

export type IUserInfo = Omit<IUser, 'username' | 'email' | 'password'>;

export interface ILoginUser {
  login: string;
  password: string;
}

export interface IUserState {
  user: IUser | null;
  isAuth: boolean;
  error: null | string;
}

export enum UsersActionType {
  CREATE_USER = 'CREATE_USER',
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  DELETE_USER = 'DELETE_USER',
  CHANGE_USER_LOGIN = 'CHANGE_USER_LOGIN',
  CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL',
  CHANGE_USER_INFO = 'CHANGE_USER_INFO',
}
