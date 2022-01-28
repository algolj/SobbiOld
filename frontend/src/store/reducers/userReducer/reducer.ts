import {
  ActionTypesUsers,
  IUserState,
  UsersActionType,
} from '../../../types/userTypes';

const initialState: IUserState = {
  user: [],
  error: null,
};

export const userReducer = (state = initialState, action: ActionTypesUsers) => {
  switch (action.type) {
    // case CREATE_USER:
    //   return { ...state, user: action.payload, error: null };
    default:
      return state;
  }
};
