import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWebsiteConfiguration {
  _id?: string;
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
}

interface IWebsiteConfigurationState {
  _id?: string;
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
}

const initialState: IWebsiteConfigurationState = {
  _id: "",
  title: "",
  email: "",
  phoneNumber: "",
  tabTitle: "",
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
      document.title = action.payload.tabTitle || "Loading";
    },
  },
});

export default websiteConfigurationSlice.reducer;
