import { combineReducers } from 'redux';
import { userReducer } from './userReducer/reducer';
import { roomReducer } from './roomReducer/reducer';
import notificationReducer from '../reducers/basicReducer/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
