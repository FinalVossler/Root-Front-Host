import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import postReducer from "./slices/postSlice";
import pageReducer from "./slices/pageSlice";
import websiteConfigurationReducer from "./slices/websiteConfigurationSlice";
import userPreferenceReducer from "./slices/userPreferencesSlice";
import fieldReducer from "./slices/fieldSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    post: postReducer,
    page: pageReducer,
    websiteConfiguration: websiteConfigurationReducer,
    userPreferences: userPreferenceReducer,
    field: fieldReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
