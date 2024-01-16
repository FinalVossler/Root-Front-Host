import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  LOCAL_STORAGE_TOKEN_ITEM_NAME,
  TIME_FORMAT,
} from "../../config/constants";

import {
  IPaginationResponse,
  IRoleReadDto,
  IUserReadDto,
  SuperRoleEnum,
} from "roottypes";

export type TokenInformation = {
  value: string;
  expiresIn: string;
  lastTokenUpdate: string;
};

export interface IUserState {
  user: IUserReadDto;
  tokenInformation: TokenInformation;
  users: IUserReadDto[];
  total: number;
  searchedUsers: IPaginationResponse<IUserReadDto>;
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
    superRole: SuperRoleEnum.Normal,
    profilePicture: {
      url: "",
      uuid: "",
      isImage: true,
      name: "",
    },
    role: undefined,
  },
  tokenInformation: tokenInformationInStorage,
  users: [],
  total: 0,
  searchedUsers: {
    data: [],
    total: 0,
  },
};

export const setUserAndTokenInformationInLocalStorage = (payload: {
  user: IUserReadDto;
  token: string;
  expiresIn: string;
}) => {
  const newTokenInformation = {
    value: payload.token,
    expiresIn: payload.expiresIn,
    lastTokenUpdate: moment().format(TIME_FORMAT),
  };

  // update local storage
  localStorage.setItem(
    LOCAL_STORAGE_TOKEN_ITEM_NAME,
    JSON.stringify(newTokenInformation)
  );
};

export const logoutInLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_ITEM_NAME);
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUserReadDto>) => {
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
      action: PayloadAction<{
        user: IUserReadDto;
        token: string;
        expiresIn: string;
      }>
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

      logoutInLocalStorage();
    },
    setUsers: (
      state: IUserState,
      action: PayloadAction<{ users: IUserReadDto[]; total: number }>
    ) => {
      const users: IUserReadDto[] = action.payload.users;
      const total: number = action.payload.total;
      state.users = users;
      state.total = total;
    },
    addUser: (state: IUserState, action: PayloadAction<IUserReadDto>) => {
      const user: IUserReadDto = action.payload;
      state.users.unshift(user);
    },
    updateUser: (state: IUserState, action: PayloadAction<IUserReadDto>) => {
      const user: IUserReadDto = action.payload;
      state.users = state.users.map((f) => (f._id === user._id ? user : f));
      state.searchedUsers.data = state.searchedUsers.data.map((u) => {
        if (u._id === user._id) {
          return user;
        } else {
          return u;
        }
      });
    },
    updateUserRoleAfterRoleUpdate: (
      state: IUserState,
      action: PayloadAction<IRoleReadDto>
    ) => {
      state.user.role = action.payload;
    },
    deleteUsers: (state: IUserState, action: PayloadAction<string[]>) => {
      const usersIds: string[] = action.payload;
      state.users = state.users.filter((u) => usersIds.indexOf(u._id) === -1);
      state.searchedUsers.data = state.searchedUsers.data.filter(
        (u) => usersIds.indexOf(u._id) === -1
      );
    },
    setSearchedUsers: (
      state: IUserState,
      action: PayloadAction<IPaginationResponse<IUserReadDto>>
    ) => {
      state.searchedUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
