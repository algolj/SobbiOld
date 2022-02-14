import { Dispatch } from 'react';
import { ActionTypesRoom, IRoom } from '../../types/roomTypes';
import $api from '../../http/http';
import { createRoomAction } from '../reducers/roomReducer/actions';

export const createRoom = (room: IRoom) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      const response = await $api.post('/room', room);
      console.log(response.data);
      // dispatch(createRoomAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
