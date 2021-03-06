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

export const changeUserInfoAction = (info: IUser) =>
  ({
    type: UsersActionType.CHANGE_USER_INFO,
    payload: info,
  } as const);

export const setIsEditAction = (isEdit: boolean) =>
  ({
    type: UsersActionType.IS_EDIT,
    payload: isEdit,
  } as const);

export const setIsEditBioAction = (isEditBio: boolean) =>
  ({
    type: UsersActionType.IS_EDIT_BIO,
    payload: isEditBio,
  } as const);
