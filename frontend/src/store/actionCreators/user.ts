import {
  ActionTypesUsers,
  IAuthResponse,
  ILoginUser,
  IUser,
  IUserInfo,
} from '../../types/userTypes';
import { Dispatch } from 'react';
import {
  changeUserEmailAction,
  changeUserInfoAction,
  changeUserNameAction,
  createUserAction,
  loginUserAction,
  logoutUserAction,
  setIsEditAction,
  setIsEditBioAction,
  setUserAvatarAction,
} from '../reducers/userReducer/actions';
import $userApi from '../../http/roomService';

export const loginUser = (user: ILoginUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $userApi.post<IAuthResponse>('/user/login', {
        login: user.login,
        password: user.password,
      });
      localStorage.setItem('token', response.data.token);
      $userApi.get('/profile').then((res) => {
        dispatch(loginUserAction(res.data));
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const createUser = (user: IUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    const registerResponse = await $userApi.post('user', user);
    dispatch(createUserAction(registerResponse.data));
  };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return logoutUserAction();
};

export const checkAuth = () => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $userApi.get('/profile');
      const token = localStorage.getItem('token');
      localStorage.setItem('token', token!);
      dispatch(loginUserAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteUser = () => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      await $userApi.delete('user');
      localStorage.removeItem('token');
      dispatch(logoutUserAction());
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeUserEmail = (email: string) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $userApi.put('user/change/email', email);
      localStorage.setItem('token', response.data.token);
      dispatch(changeUserEmailAction(email));
    } catch (e) {
      console.log(e);
    }
  };
};
export const changeUserName = (username: string) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $userApi.put('user/change/email', username);
      localStorage.setItem('token', response.data.token);
      dispatch(changeUserNameAction(username));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeUserInfo = (user: IUserInfo) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $userApi.put('profile', user);
      dispatch(changeUserInfoAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setIsEdit = (isEdit: boolean) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      dispatch(setIsEditAction(isEdit));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setIsEditBio = (isEditBio: boolean) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      dispatch(setIsEditBioAction(isEditBio));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeUserAvatar = (avatar: string) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $userApi.post('/profile/image', avatar);
      console.log(response.data);
      dispatch(setUserAvatarAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
