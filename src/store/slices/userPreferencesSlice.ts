import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserPreferencesState {
  language: string;
}

const initialState: IUserPreferencesState = {
  language: "en",
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
  },
});

export default userPreferenceSlice.reducer;
