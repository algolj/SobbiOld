import {
  ActionTypesUsers,
  IAuthResponse,
  ILoginUser,
  INewUser,
} from '../../types/userTypes';
import { Dispatch } from 'react';
import {
  createUserAction,
  loginUserAction,
  logoutUserAction,
} from '../reducers/userReducer/actions';
import $api from '../../http/http';

export const createUser = (user: INewUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    const response = await $api.post('http://localhost:3000/api/user', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    dispatch(createUserAction(response.data));
  };
};

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
    } catch (e) {
      console.log(e);
    }
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  return logoutUserAction();
};

export const checkAuth = () => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      $api.get('/profile').then((res) => {
        const token = localStorage.getItem('token');
        localStorage.setItem('token', token!);
        console.log(res.data.token);
        dispatch(loginUserAction(res.data));
      });
    } catch (e) {
      console.log(e);
    }
  };
};
