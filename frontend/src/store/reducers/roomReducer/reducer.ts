import {
  ActionTypesRoom,
  ActionTypesRoomEnum,
  IRoomState,
} from '../../../types/roomTypes';

const initialState: IRoomState = {
  room: {
    date: '',
    creator: '',
    interviewee: '',
    interviewer: '',
    name: '',
    watcher: '',
  },
  isAuthRoom: false,
  error: null,
};

export const roomReducer = (state = initialState, action: ActionTypesRoom) => {
  switch (action.type) {
    case ActionTypesRoomEnum.CREATE_ROOM:
      return { ...state, room: action.payload, error: null };
    case ActionTypesRoomEnum.ENTER_ROOM:
      return { ...state, isAuthRoom: true, error: null };
    default:
      return state;
  }
};
