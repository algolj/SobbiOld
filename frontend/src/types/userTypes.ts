import * as UserActions from '../store/reducers/userReducer/actions';

export type InferValueTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type ActionTypesUsers = ReturnType<InferValueTypes<typeof UserActions>>;

export interface IAuthResponse {
  token: string;
  data: ILoginUser[];
}

export interface IUserForm {
  formUsername: string;
  formEmail: string;
  formFirstName: string;
  formLastName: string;
  formBio: string;
  formSocialMedia: string;
  formGender: string;
  formDateOfBirth: string;
  formCountry: string;
  formImage: FormData;
  socialMediaPicked?: string;
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

export interface ISocialMedia {
  linkedIn?: string;
  facebook?: string;
  github?: string;
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
  image?: any;
  imagePath?: string;
  imageFile?: FormData;
  socialMedia?: ISocialMedia | null;
  id?: 1;
}

export type IUserInfo = Omit<IUser, 'username' | 'email' | 'password'>;
export type IUserLogin = Pick<IUser, 'username' | 'email'>;

export interface ILoginUser {
  login: string;
  password: string;
}

export interface IUserState {
  user: IUser | null;
  isAuth: boolean;
  error: null | string;
  isEditBio: boolean;
  isEditUser: boolean;
}

export enum UsersActionType {
  CREATE_USER = 'CREATE_USER',
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  DELETE_USER = 'DELETE_USER',
  CHANGE_USER_LOGIN = 'CHANGE_USER_LOGIN',
  CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL',
  CHANGE_USER_INFO = 'CHANGE_USER_INFO',
  IS_EDIT_USER = 'IS_EDIT_USER',
  IS_EDIT_BIO = 'IS_EDIT_BIO',
  CHANGE_USER_AVATAR = 'CHANGE_USER_AVATAR',
  GET_USER_AVATAR = 'GET_USER_AVATAR',
}
