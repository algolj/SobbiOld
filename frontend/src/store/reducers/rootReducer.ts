import { combineReducers } from 'redux';
import { userReducer } from './userReducer/reducer';
import { roomReducer } from './roomReducer/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
