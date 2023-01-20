import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
