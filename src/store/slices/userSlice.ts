import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  LOCAL_STORAGE_TOKEN_ITEM_NAME,
  TIME_FORMAT,
} from "../../config/constants";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type TokenInformation = null | {
  value: string;
  expiresIn: string;
  lastTokenUpdate: string;
};

export interface IUserState {
  user: IUser;
  tokenInformation: TokenInformation;
}

const initialState: IUserState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  tokenInformation: {
    expiresIn: "",
    lastTokenUpdate: "",
    value: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setTokenInformation: (
      state: IUserState,
      action: PayloadAction<TokenInformation>
    ) => {
      state.tokenInformation = action.payload;
    },
    setUserAndTokenInformation: (
      state: IUserState,
      action: PayloadAction<{ user: IUser; token: string; expiresIn: string }>
    ) => {
      state.user = action.payload.user;

      const newTokenInformation = {
        value: action.payload.token,
        expiresIn: action.payload.expiresIn,
        lastTokenUpdate: moment().format(TIME_FORMAT),
      };
      state.tokenInformation = newTokenInformation;

      // update local storage
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_ITEM_NAME,
        JSON.stringify(newTokenInformation)
      );
    },
    logout: (state: IUserState) => {
      state.tokenInformation = initialState.tokenInformation;
      state.user = initialState.user;

      localStorage.removeItem(LOCAL_STORAGE_TOKEN_ITEM_NAME);
    },
  },
});

export default userSlice.reducer;
