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
      return { ...state, user: '', error: null, isAuth: false };
    default:
      return state;
  }
};
