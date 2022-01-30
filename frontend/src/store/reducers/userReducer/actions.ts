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
