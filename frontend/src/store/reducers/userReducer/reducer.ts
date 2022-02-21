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
  isEditUser: false,
  isEditBio: false,
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
    case UsersActionType.CHANGE_USER_AVATAR:
      return { ...state, user: { ...state.user, imagePath: action.payload } };
    case UsersActionType.GET_USER_AVATAR:
      return { ...state, user: { ...state.user, image: action.payload } };
    case UsersActionType.IS_EDIT_USER:
      return { ...state, isEditUser: action.payload };
    case UsersActionType.IS_EDIT_BIO:
      return { ...state, isEditBio: action.payload };
    default:
      return state;
  }
};
