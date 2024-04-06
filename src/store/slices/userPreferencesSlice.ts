import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserPreferencesState {
  language: string;
  isSideMenuOpen: boolean;
  sideMenuExtendedModels: boolean;
  sideMenuExtendedUserRoles: boolean;
}

const initialState: IUserPreferencesState = {
  language: "en",
  isSideMenuOpen: false,
  sideMenuExtendedModels: false,
  sideMenuExtendedUserRoles: false,
};

export const userPreferenceSlice = createSlice({
  name: "userPeference",
  initialState,
  reducers: {
    setLanguage: (
      state: IUserPreferencesState,
      action: PayloadAction<string>
    ) => {
      state.language = action.payload;
    },
    toggleSideMenu: (
      state: IUserPreferencesState,
      action: PayloadAction<void>
    ) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },

    setIsSideMenuOpen: (
      state: IUserPreferencesState,
      action: PayloadAction<boolean>
    ) => {
      state.isSideMenuOpen = action.payload;
    },
    triggerExtendModels: (
      state: IUserPreferencesState,
      action: PayloadAction<void>
    ) => {
      state.sideMenuExtendedModels = !state.sideMenuExtendedModels;
    },
    triggerExtendedUserRoles: (
      state: IUserPreferencesState,
      action: PayloadAction<void>
    ) => {
      state.sideMenuExtendedUserRoles = !state.sideMenuExtendedUserRoles;
    },
  },
});

const userPreferenceReducer = userPreferenceSlice.reducer;

export default userPreferenceReducer;
