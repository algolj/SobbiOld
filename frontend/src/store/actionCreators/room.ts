import { Dispatch } from 'react';
import { ActionTypesRoom, IAuthRoom, IRoom } from '../../types/roomTypes';
import $api from '../../http/http';
import {
  createRoomAction,
  enterRoomAction,
} from '../reducers/roomReducer/actions';

export const createRoom = (room: IRoom) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      const response = await $api.post('room', room);
      dispatch(createRoomAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const enterRoom = (authRoom: IAuthRoom) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      const response = await $api.post('room/login', authRoom);
      localStorage.setItem('room', response.data);
      if (response) dispatch(enterRoomAction(true));
    } catch (e) {
      console.log(e);
    }
  };
};
