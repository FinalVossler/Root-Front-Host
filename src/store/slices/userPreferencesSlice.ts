import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserPreferencesState {
  language: string;
  isSideMenuOpen: boolean;
  sideMenuExtendedModels: boolean;
}

const initialState: IUserPreferencesState = {
  language: "en",
  isSideMenuOpen: true,
  sideMenuExtendedModels: false,
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
    triggerExtendModels: (
      state: IUserPreferencesState,
      action: PayloadAction<void>
    ) => {
      state.sideMenuExtendedModels = !state.sideMenuExtendedModels;
    },
  },
});

export default userPreferenceSlice.reducer;
