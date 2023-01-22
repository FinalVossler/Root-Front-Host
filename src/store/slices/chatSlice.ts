import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";

export interface IMessage {
  _id: string;
  from: string;
  to: string[];
  message: string;
}

interface IChatState {
  contacts: IUser[];
  selectedContactId?: string;
}

const initialState: IChatState = {
  contacts: [],
  selectedContactId: undefined,
};

export const chatSlice = createSlice({
  name: "chat",
  reducers: {
    setContacts: (state: IChatState, action: PayloadAction<IUser[]>) => {
      state.contacts = action.payload;
    },
    setSelectedContactID: (
      state: IChatState,
      action: PayloadAction<string | undefined>
    ) => {
      state.selectedContactId = action.payload;
    },
  },
  initialState,
});

export default chatSlice.reducer;
