import { IUser, UsersActionType } from '../../../types/userTypes';

export const createUser = (user: IUser) =>
  ({
    type: UsersActionType,
    payload: user,
  } as const);
