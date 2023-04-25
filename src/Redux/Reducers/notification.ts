import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications : any
}

const initialState: NotificationState = {
  notifications : []
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    saveNotification: (state, action: PayloadAction<any>) => {
        state.notifications = action.payload;
      },
  },
});

export const {saveNotification } = notificationSlice.actions;

export default notificationSlice.reducer;