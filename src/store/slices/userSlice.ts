import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  LOCAL_STORAGE_TOKEN_ITEM_NAME,
  TIME_FORMAT,
} from "../../config/constants";
import { toast } from "react-toastify";

import IFile from "../../globalTypes/IFile";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: IFile;
}

export type TokenInformation = {
  value: string;
  expiresIn: string;
  lastTokenUpdate: string;
};

export interface IUserState {
  user: IUser;
  tokenInformation: TokenInformation;
}

// Initializing the token from local storage
let tokenInformationInStorage: TokenInformation = {
  expiresIn: "",
  lastTokenUpdate: "",
  value: "",
};

let tokenInformationInStorageAsString = localStorage.getItem(
  LOCAL_STORAGE_TOKEN_ITEM_NAME
);

// If we have something stored in the local storage, then we update the state
if (tokenInformationInStorageAsString) {
  try {
    tokenInformationInStorage = JSON.parse(tokenInformationInStorageAsString);
  } catch (e) {
    // Oh somebody messed with the our local storage manually (HACKER!)
    toast.error(
      "Failed getting a stored token in local storage. Someone messed with your local storage!"
    );
  }
}

const initialState: IUserState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: {
      url: "",
      uuid: "",
      isImage: true,
      name: "",
    },
  },
  tokenInformation: tokenInformationInStorage,
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
      state.tokenInformation = {
        expiresIn: "",
        lastTokenUpdate: "",
        value: "",
      };
      state.user = initialState.user;

      localStorage.removeItem(LOCAL_STORAGE_TOKEN_ITEM_NAME);
    },
  },
});

export default userSlice.reducer;
