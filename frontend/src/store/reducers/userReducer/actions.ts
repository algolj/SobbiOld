import {
  IAuthResponse,
  ILoginUser,
  INewUser,
  UsersActionType,
} from '../../../types/userTypes';

export const createUserAction = (user: INewUser) =>
  ({
    type: UsersActionType.CREATE_USER,
    payload: user,
  } as const);

export const loginUserAction = (user: INewUser) =>
  ({
    type: UsersActionType.LOGIN_USER,
    payload: user,
  } as const);

export const logoutUserAction = () =>
  ({
    type: UsersActionType.LOGOUT_USER,
  } as const);
