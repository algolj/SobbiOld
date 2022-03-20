import { createSlice } from '@reduxjs/toolkit';

interface INotificationState {
  notifications: Array<string>;
}

const initialState: INotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNewNotification(state, action /*:PayloadAction<string>*/) {
      state.notifications.push(action.payload);
    },
    removeNotification(state) {
      state.notifications.shift();
    },
  },
});

export default notificationSlice.reducer;
