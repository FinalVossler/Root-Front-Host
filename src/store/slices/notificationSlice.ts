import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import ITranslatedText from "../../globalTypes/ITranslatedText";
import { IUser } from "./userSlice";

export interface INotification {
  _id: string;
  text: ITranslatedText[];
  link: string;
  image?: IFile;
  notifiedUser: IUser;
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
      state.notifications.push(action.payload.notification);
      state.total++;
      state.totalUnclicked++;
    },
  },
});

export default notificationSlice.reducer;
