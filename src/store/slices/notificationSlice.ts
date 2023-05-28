import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import ITranslatedText from "../../globalTypes/ITranslatedText";

export interface INotification {
  _id: string;
  text: ITranslatedText[];
  link: string;
  image?: IFile;
  to: string[];
  clicked?: boolean;

  createdAt: string;
  updatedAt: string;
}

interface INotificationState {
  notifications: INotification[];
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
        notifications: INotification[];
        totalUnclicked: number;
      }>
    ) => {
      state.notifications = action.payload.notifications;
      state.total = action.payload.total;
      state.totalUnclicked = action.payload.totalUnclicked;
    },
    addNotification: (
      state: INotificationState,
      action: PayloadAction<{ notification: INotification }>
    ) => {
      state.notifications = [
        ...state.notifications,
        action.payload.notification,
      ];
      state.total++;
      state.totalUnclicked++;
    },
    setNotificationToClicked: (
      state: INotificationState,
      action: PayloadAction<{ notificationId: string }>
    ) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        clicked:
          notification._id === action.payload.notificationId
            ? true
            : notification.clicked,
      }));
      if (state.totalUnclicked > 0) {
        state.totalUnclicked--;
      }
    },
  },
});

export default notificationSlice.reducer;
