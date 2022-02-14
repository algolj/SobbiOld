import * as UserActionCreators from './user';
import * as RoomActionCreators from './room';

export default {
  ...UserActionCreators,
  ...RoomActionCreators,
};