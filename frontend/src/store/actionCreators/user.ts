import { ActionTypesUsers, ILoginUser, INewUser } from '../../types/userTypes';
import axios from 'axios';
import { Dispatch } from 'react';
import {
  createUserAction,
  loginUserAction,
} from '../reducers/userReducer/actions';

export const createUser = (user: INewUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    const response = await axios.post('http://localhost:3000/api/user', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    dispatch(createUserAction(response.data));
  };
};

export const loginUser = (user: ILoginUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    const response = await axios.post('http://localhost:3000/api/user/login', {
      login: user.login,
      password: user.password,
    });
    dispatch(loginUserAction(response.data));
  };
};
