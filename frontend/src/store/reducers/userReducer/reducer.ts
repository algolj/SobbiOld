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
  username: '',
  email: '',
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
      return { ...state, user: '', error: null, isAuth: false };
    case UsersActionType.CHANGE_USER_LOGIN:
      return { ...state, username: action.payload };
    case UsersActionType.CHANGE_USER_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
