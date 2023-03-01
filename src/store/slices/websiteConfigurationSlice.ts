import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import theme, { Theme } from "../../config/theme";

export interface IWebsiteConfiguration {
  _id?: string;
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  withChat?: boolean;
  withRegistration?: boolean;
  theme: Theme;
}

interface IWebsiteConfigurationState {
  _id?: string;
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  withChat?: boolean;
  withRegistration?: boolean;
  theme: Theme;
}

const initialState: IWebsiteConfigurationState = {
  _id: "",
  title: "",
  email: "",
  phoneNumber: "",
  tabTitle: "",
  withChat: false,
  withRegistration: false,
  theme,
};

export const websiteConfigurationSlice = createSlice({
  name: "websiteConfiguration",
  initialState,
  reducers: {
    setConfiguration: (
      state: IWebsiteConfigurationState,
      action: PayloadAction<IWebsiteConfiguration>
    ) => {
      state.email = action.payload.email;
      state.title = action.payload.title;
      state.phoneNumber = action.payload.phoneNumber;
      state.tabTitle = action.payload.tabTitle;
      state.withChat = action.payload.withChat;
      state.withRegistration = action.payload.withRegistration;
      state.theme = action.payload.theme;
      document.title = action.payload.tabTitle || "Loading";
    },
  },
});

export default websiteConfigurationSlice.reducer;
