import {
  ActionTypesUsers,
  IUserState,
  UsersActionType,
} from '../../../types/userTypes';

const initialState: IUserState = {
  user: [],
  isAuth: false,
  error: null,
};

export const userReducer = (state = initialState, action: ActionTypesUsers) => {
  switch (action.type) {
    case UsersActionType.CREATE_USER:
      return { ...state, user: action.payload, error: null };
    case UsersActionType.LOGIN_USER:
      return { ...state, user: action.payload, error: null, isAuth: true };
    default:
      return state;
  }
};
