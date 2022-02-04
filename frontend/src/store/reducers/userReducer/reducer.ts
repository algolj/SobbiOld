import {
  ActionTypesUsers,
  IUserState,
  UsersActionType,
} from '../../../types/userTypes';

const initialState: IUserState = {
  user: {
    username: '',
    email: '',
    password: '',
  },
  isAuth: false,
  error: null,
};

export const userReducer = (state = initialState, action: ActionTypesUsers) => {
  switch (action.type) {
    case UsersActionType.CREATE_USER:
      return { ...state, user: action.payload, error: null, isAuth: true };
    case UsersActionType.LOGIN_USER:
      return { ...state, user: action.payload, error: null, isAuth: true };
    case UsersActionType.LOGOUT_USER:
      return { ...state, user: null, error: null, isAuth: false };
    case UsersActionType.CHANGE_USER_LOGIN:
      return { ...state, user: { ...state.user, username: action.payload } };
    case UsersActionType.CHANGE_USER_EMAIL:
      return { ...state, user: { ...state.user, email: action.payload } };
    case UsersActionType.CHANGE_USER_INFO:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
