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
import microFrontendReducer from "./slices/microFrontendSlice";
import editorReducer from "./slices/editorSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";

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
    microFrontend: microFrontendReducer,
    editor: editorReducer,
    cart: cartReducer,
    address: addressReducer,
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
