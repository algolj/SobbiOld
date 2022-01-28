import {
  ActionTypesUsers,
  IUser,
  UsersActionType,
} from '../../types/userTypes';
import axios from 'axios';
import { Dispatch } from 'react';

export const createUser = (user: IUser) => {
  return async (dispatch: Dispatch<ActionTypesUsers>) => {
    const response = await axios.post('http://localhost:3000/api/user', {});
  };
};
