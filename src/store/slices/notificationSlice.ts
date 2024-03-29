import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INotificationReadDto } from "roottypes";

interface INotificationState {
  notifications: INotificationReadDto[];
  total: number;
  totalUnclicked: number;
}

const initialState: INotificationState = {
  notifications: [],
  total: 0,
  totalUnclicked: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (
      state: INotificationState,
      action: PayloadAction<{
        total: number;
        notifications: INotificationReadDto[];
        totalUnclicked: number;
      }>
    ) => {
      state.notifications = action.payload.notifications;
      state.total = action.payload.total;
      state.totalUnclicked = action.payload.totalUnclicked;
    },
    addNotification: (
      state: INotificationState,
      action: PayloadAction<{ notification: INotificationReadDto }>
    ) => {
      state.notifications = [
        ...state.notifications,
        action.payload.notification,
      ];
      state.total++;
      state.totalUnclicked++;
    },
    setNotificationToClickedBy: (
      state: INotificationState,
      action: PayloadAction<{ notificationId: string; userId: string }>
    ) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        clickedBy:
          notification._id === action.payload.notificationId
            ? [
                ...notification.clickedBy?.filter(
                  (id) => id !== action.payload.userId
                ),
                action.payload.userId,
              ]
            : notification.clickedBy,
      }));
      if (state.totalUnclicked > 0) {
        state.totalUnclicked--;
      }
    },
    markAllUserNotificationAsClicked: (
      state: INotificationState,
      action: PayloadAction<string>
    ) => {
      state.totalUnclicked = 0;
      state.notifications = state.notifications.map((not) => ({
        ...not,
        clickedBy: [
          ...not.clickedBy.filter((userId) => userId !== action.payload),
          action.payload,
        ],
      }));
    },
  },
});

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;
