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
} from '../reducers/userReducer/actions';
import $api, { API_URL } from '../../http/http';
import axios from 'axios';

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
      console.log(response);
      localStorage.setItem('token', response.data.token);
      dispatch(loginUserAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    try {
      const response = $api.get('/profile').then((res) => {
        const token = localStorage.getItem('token');
        localStorage.setItem('token', token!);
        dispatch(loginUserAction(res.data));
      });
    } catch (e) {
      console.log(e);
    }
  };
};
