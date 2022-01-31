import {
  ActionTypesUsers,
  IAuthResponse,
  ILoginUser,
  IUser,
} from '../../types/userTypes';
import { Dispatch } from 'react';
import {
  changeUserEmailAction,
  changeUserNameAction,
  createUserAction,
  loginUserAction,
  logoutUserAction,
} from '../reducers/userReducer/actions';
import $api from '../../http/http';

export const loginUser = (user: ILoginUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $api.post<IAuthResponse>('/user/login', {
        login: user.login,
        password: user.password,
      });
      localStorage.setItem('token', response.data.token);
      $api.get('/profile').then((res) => {
        dispatch(loginUserAction(res.data));
      });
      console.log('sadasd');
    } catch (e) {
      console.log(e);
    }
  };
};

export const createUser = (user: IUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    const registerResponse = await $api.post('http://localhost:3000/api/user', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
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
      await $api.get('/profile').then((res) => {
        const token = localStorage.getItem('token');
        localStorage.setItem('token', token!);
        dispatch(loginUserAction(res.data));
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteUser = () => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      await $api.delete('user');
      dispatch(logoutUserAction());
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeUserEmail = (email: string, type?: string) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $api.put('user/change/email', {
        email: email,
      });
      localStorage.setItem('token', response.data.token);
      dispatch(changeUserEmailAction(email));
    } catch (e) {
      console.log(e);
    }
  };
};
export const changeUserName = (username: string, type?: string) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = await $api.put('user/change/email', {
        username: username,
      });
      localStorage.setItem('token', response.data.token);
      dispatch(changeUserNameAction(username));
    } catch (e) {
      console.log(e);
    }
  };
};
