import {
  IAuthResponse,
  INewUser,
  UsersActionType,
} from '../../../types/userTypes';

export const createUserAction = (user: INewUser) =>
  ({
    type: UsersActionType.CREATE_USER,
    payload: user,
  } as const);

export const loginUserAction = (user: IAuthResponse) =>
  ({
    type: UsersActionType.LOGIN_USER,
    payload: user,
  } as const);
