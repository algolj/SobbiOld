import { ActionTypesRoom, IRoomState } from '../../../types/roomTypes';

const initialState: IRoomState = {
  room: {
    date: '',
    creator: '',
    interviewee: '',
    interviewer: '',
    name: '',
    watcher: '',
  },
  error: null,
};

export const roomReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypesRoom.CREATE_ROOM:
      return { ...state, room: action.payload, error: null };
    default:
      return state;
  }
};
