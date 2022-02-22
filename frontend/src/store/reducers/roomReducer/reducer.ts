import {
  ActionTypesRoom,
  ActionTypesRoomEnum,
  IRoomState,
} from '../../../types/roomTypes';

const initialState: IRoomState = {
  room: {
    date: '',
    name: '',
    creator: {
      name: '',
      email: '',
    },
    interviewee: [],
    interviewer: [],
    watcher: [],
  },
  isEditRoom: false,
  isAuthRoom: false,
  error: null,
};

export const roomReducer = (state = initialState, action: ActionTypesRoom) => {
  switch (action.type) {
    case ActionTypesRoomEnum.CREATE_ROOM:
      return { ...state, room: action.payload, error: null };
    case ActionTypesRoomEnum.ENTER_ROOM:
      return { ...state, isAuthRoom: true, error: null };
    case ActionTypesRoomEnum.IS_EDIT_ROOM:
      return { ...state, isEditRoom: true, error: null };
    case ActionTypesRoomEnum.GET_ROOM_INFO:
      return { ...state, room: action.payload, error: null };
    case ActionTypesRoomEnum.ADD_INTERVIEWER:
      return {
        ...state,
        room: {
          ...state,
          interviewer: [...state.room.interviewer, action.payload],
        },
        error: null,
      };
    case ActionTypesRoomEnum.ADD_INTERVIEWEE:
      return {
        ...state,
        room: {
          ...state,
          interviewee: [...state.room.interviewee, action.payload],
        },
        error: null,
      };
    case ActionTypesRoomEnum.ADD_WATCHER:
      return {
        ...state,
        room: {
          ...state,
          watcher: [...state.room.watcher, action.payload],
        },
        error: null,
      };
    case ActionTypesRoomEnum.CHANGE_ROOM_DATE:
      return {
        ...state,
        room: { ...state, date: action.payload },
        error: null,
      };
    // case ActionTypesRoomEnum.CHANGE_ROOM_USERNAME:
    //   return {
    //     ...state,
    //     room: { ...state, date: action.payload },
    //     error: null,
    //   };
    default:
      return state;
  }
};
