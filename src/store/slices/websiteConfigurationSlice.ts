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
    profile: {
      alreadyHaveAnAccount: ITranslatedText[];
      dontHaveAnAccount: ITranslatedText[];
      loginHere: ITranslatedText[];
      registerHere: ITranslatedText[];
    };
    login: {
      title: ITranslatedText[];
      emailPlaceholder: ITranslatedText[];
      passwordPlaceholder: ITranslatedText[];
    };
    header: {
      language: ITranslatedText[];
    };
    registration: {
      title: ITranslatedText[];
      firstNamePlaceholder: ITranslatedText[];
      lastNamePlaceholder: ITranslatedText[];
      emailPlaceholder: ITranslatedText[];
      passwordPlaceholder: ITranslatedText[];
      confirmPasswordPlaceholder: ITranslatedText[];
      buttonText: ITranslatedText[];
    };
    sideMenu: {
      fields: ITranslatedText[];
      models: ITranslatedText[];
    };
    fields: {
      createField: ITranslatedText[];
      namePlaceholder: ITranslatedText[];
      typePlaceholder: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
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
    profile: {
      alreadyHaveAnAccount: [
        { text: "Already have an account?", language: "en" },
        { text: "Vous avez déjà un compte?", language: "fr" },
      ],
      dontHaveAnAccount: [
        { text: "Don't have an account?", language: "en" },
        { text: "Vous n'avez pas de compte?", language: "fr" },
      ],
      loginHere: [
        { text: "Login", language: "en" },
        { text: "Connectez-vous ici", language: "fr" },
      ],
      registerHere: [
        { text: "Register here", language: "en" },
        { text: "Enregistrez-vous ici", language: "fr" },
      ],
    },
    login: {
      title: [
        {
          text: "Login",
          language: "en",
        },
        {
          text: "Connexion",
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
    header: {
      language: [
        {
          language: "en",
          text: "",
        },
        {
          language: "fr",
          text: "",
        },
      ],
    },
    registration: {
      title: [
        { language: "en", text: "Register" },
        { language: "fr", text: "Créer un compte" },
      ],
      confirmPasswordPlaceholder: [
        { language: "en", text: "Confim your password" },
        { language: "fr", text: "Confirmez votre mot de passe" },
      ],
      emailPlaceholder: [
        { language: "en", text: "Email" },
        { language: "fr", text: "Email" },
      ],
      firstNamePlaceholder: [
        { language: "en", text: "Firstname" },
        { language: "fr", text: "Prénom" },
      ],
      lastNamePlaceholder: [
        { language: "en", text: "Lastname" },
        { language: "fr", text: "Nom" },
      ],
      passwordPlaceholder: [
        { language: "en", text: "Password" },
        { language: "fr", text: "Mot de passe" },
      ],
      buttonText: [
        { language: "en", text: "Register" },
        { language: "fr", text: "S'enregistrer" },
      ],
    },
    sideMenu: {
      fields: [
        { language: "en", text: "Fields" },
        { language: "fr", text: "Champs" },
      ],
      models: [
        { language: "en", text: "Models" },
        { language: "fr", text: "Modèles" },
      ],
    },
    fields: {
      createField: [
        { language: "en", text: "Create a field" },
        { language: "fr", text: "Créer un champ" },
      ],
      namePlaceholder: [
        { language: "en", text: "Name" },
        { language: "fr", text: "Nom" },
      ],
      typePlaceholder: [
        { language: "en", text: "Type" },
        { language: "fr", text: "Type" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Soumettre" },
      ],
      language: [
        { language: "en", text: "Language" },
        { language: "fr", text: "Langue" },
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
