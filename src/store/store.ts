import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import postReducer from "./slices/postSlice";
import pageReducer from "./slices/pageSlice";
import websiteConfigurationReducer from "./slices/websiteConfigurationSlice";
import userPreferenceReducer from "./slices/userPreferencesSlice";
import fieldReducer from "./slices/fieldSlice";
import modelReducer from "./slices/modelSlice";
import entityReducer from "./slices/entitySlice";
import roleReducer from "./slices/roleSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    post: postReducer,
    page: pageReducer,
    websiteConfiguration: websiteConfigurationReducer,
    userPreferences: userPreferenceReducer,
    field: fieldReducer,
    model: modelReducer,
    entity: entityReducer,
    role: roleReducer,
    notification: notificationReducer,
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
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
