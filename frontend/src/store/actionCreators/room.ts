import { Dispatch } from 'react';
import {
  ActionTypesRoom,
  IAuthRoom,
  IDeleteUserRoom,
  INewUser,
  IRoom,
} from '../../types/roomTypes';
import {
  addUserAction,
  changeRoomDateAction,
  changeRoomUsernameAction,
  createRoomAction,
  enterRoomAction,
  getRoomInfoAction,
  setIsEditRoomAction,
} from '../reducers/roomReducer/actions';
import $roomApi from '../../http/userService';

export const createRoom = (room: IRoom) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      const response = await $roomApi.post('room', room);
      dispatch(createRoomAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const enterRoom = (authRoom: IAuthRoom) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      const response = await $roomApi.post('room/login', authRoom);
      localStorage.setItem('roomToken', response.data.token);
      if (response) dispatch(enterRoomAction(true));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getRoomInfo = () => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      const response = await $roomApi.get('room');
      dispatch(getRoomInfoAction(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeRoomDate = (date: string, roomName: string) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      await $roomApi.put(`room/${roomName}`, {
        date: date,
      });
      dispatch(changeRoomDateAction(date));
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeRoomUsername = (username: string) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      await $roomApi.put('room/user', {
        name: username,
      });
      dispatch(changeRoomUsernameAction(username));
    } catch (e) {
      console.log(e);
    }
  };
};

export const setIsEditRoom = (isEditRoom: boolean) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      dispatch(setIsEditRoomAction(isEditRoom));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addUser = (user: INewUser) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      await $roomApi.post('room/user', user);
      dispatch(addUserAction(user));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteUserRoom = (user: IDeleteUserRoom) => {
  return async (dispatch: Dispatch<ActionTypesRoom>) => {
    try {
      await $roomApi.delete('room/user', {
        data: user,
      });
      console.log(user.user);
      // dispatch(deleteUserRoomAction(user));
    } catch (e) {
      console.log(e);
    }
  };
};
