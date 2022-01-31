import { IUser, UsersActionType } from '../../../types/userTypes';

export const createUserAction = (user: IUser) =>
  ({
    type: UsersActionType.CREATE_USER,
    payload: user,
  } as const);

export const loginUserAction = (user: IUser) =>
  ({
    type: UsersActionType.LOGIN_USER,
    payload: user,
  } as const);

export const logoutUserAction = () =>
  ({
    type: UsersActionType.LOGOUT_USER,
  } as const);

export const deleteUserAction = () =>
  ({
    type: UsersActionType.DELETE_USER,
  } as const);

export const changeUserNameAction = (username: string) =>
  ({
    type: UsersActionType.CHANGE_USER_LOGIN,
    payload: username,
  } as const);
export const changeUserEmailAction = (userEmail: string) =>
  ({
    type: UsersActionType.CHANGE_USER_EMAIL,
    payload: userEmail,
  } as const);
