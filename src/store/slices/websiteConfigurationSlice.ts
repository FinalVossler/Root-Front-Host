import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import theme, { Theme } from "../../config/theme";
import ITranslatedText from "../../globalTypes/ITranslatedText";

export interface IWebsiteConfiguration {
  _id?: string;
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
  theme: Theme;
  staticText?: {
    login: {
      title: ITranslatedText[];
      emailPlaceholder: ITranslatedText[];
      passwordPlaceholder: ITranslatedText[];
    };
  };
}

interface IWebsiteConfigurationState {
  _id?: string;
  title?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
  theme: Theme;

  staticText?: IWebsiteConfiguration["staticText"];
}

const initialState: IWebsiteConfigurationState = {
  _id: "",
  title: "",
  email: "",
  phoneNumber: "",
  tabTitle: "",
  mainLanguages: ["en", "fr"],
  withChat: false,
  withRegistration: false,
  theme,

  staticText: {
    login: {
      title: [
        {
          text: "Login",
          language: "en",
        },
        {
          text: "Login",
          language: "fr",
        },
      ],
      emailPlaceholder: [
        {
          text: "Enter your email",
          language: "en",
        },
        {
          text: "Veuillez entrer votre email",
          language: "fr",
        },
      ],
      passwordPlaceholder: [
        {
          text: "Enter your password",
          language: "en",
        },
        {
          text: "Veuillez entrer votre mot de passe",
          language: "fr",
        },
      ],
    },
  },
};

export const websiteConfigurationSlice = createSlice({
  name: "websiteConfiguration",
  initialState,
  reducers: {
    setConfiguration: (
      state: IWebsiteConfigurationState,
      action: PayloadAction<IWebsiteConfiguration>
    ) => {
      state.email = action.payload.email;
      state.title = action.payload.title;
      state.phoneNumber = action.payload.phoneNumber;
      state.tabTitle = action.payload.tabTitle;
      state.mainLanguages = action.payload.mainLanguages;
      state.withChat = action.payload.withChat;
      state.withRegistration = action.payload.withRegistration;
      state.theme = action.payload.theme;

      // We override the initial values defined here by whatever is stored in the database
      // But we keep the values that aren't stored in the db.
      // This is so when we make modifications to the initial state after adding new text to the project,
      // and when we already have something stored in the database, the text here won't be overridden.
      if (action.payload.staticText) {
        if (!state.staticText) {
          state.staticText = action.payload.staticText;
        } else {
          Object.keys(action.payload.staticText).forEach((key) => {
            Object.keys(action.payload.staticText?.[key]).forEach(
              (childKey) => {
                if (!state.staticText) {
                  state.staticText = action.payload.staticText;
                } else {
                  state.staticText = {
                    ...state.staticText,
                    [key]: {
                      ...state.staticText?.[key],
                      [childKey]: action.payload.staticText?.[key][childKey],
                    },
                  };
                }
              }
            );
          });
        }
      }
      document.title = action.payload.tabTitle || "Loading";
    },
  },
});

export default websiteConfigurationSlice.reducer;
