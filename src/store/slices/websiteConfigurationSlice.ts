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
      enterYourFirstName: ITranslatedText[];
      enterYourLastName: ITranslatedText[];
      role: ITranslatedText[];
      updateProfileInformation: ITranslatedText[];
      firstNameIsRequired: ITranslatedText[];
      lastNameIsRequired: ITranslatedText[];
      upload: ITranslatedText[];
    };
    login: {
      title: ITranslatedText[];
      emailPlaceholder: ITranslatedText[];
      passwordPlaceholder: ITranslatedText[];
    };
    header: {
      language: ITranslatedText[];
      home: ITranslatedText[];
      chat: ITranslatedText[];
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
      pages: ITranslatedText[];
      profile: ITranslatedText[];
      fields: ITranslatedText[];
      models: ITranslatedText[];
      configuration: ITranslatedText[];
    };
    fields: {
      createField: ITranslatedText[];
      updateField: ITranslatedText[];
      namePlaceholder: ITranslatedText[];
      typePlaceholder: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      searchFields: ITranslatedText[];
    };
    models: {
      createModel: ITranslatedText[];
      updateModel: ITranslatedText[];
      namePlaceholder: ITranslatedText[];
      fieldsPlaceholder: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      nameIsRequired: ITranslatedText[];
    };
    elements: {
      actions: ITranslatedText[];
      edit: ITranslatedText[];
      deleteTitle: ITranslatedText[];
      deleteDescription: ITranslatedText[];
    };
    pages: {
      deletePageMessage: ITranslatedText[];
      deletePage: ITranslatedText[];
      createPage: ITranslatedText[];
      updatePage: ITranslatedText[];
      delete: ITranslatedText[];
      addPage: ITranslatedText[];
      title: ITranslatedText[];
      language: ITranslatedText[];
    };
    posts: {
      haveSomethingInMind: ITranslatedText[];
      iNeedATitleOrADescription: ITranslatedText[];
      createPost: ITranslatedText[];
      title: ITranslatedText[];
      subTitle: ITranslatedText[];
      addChildrenPosts: ITranslatedText[];
      language: ITranslatedText[];
      visibility: ITranslatedText[];
      design: ITranslatedText[];
      submit: ITranslatedText[];
    };
    entities: {
      createEntity: ITranslatedText[];
      updateEntity: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      required: ITranslatedText[];
    };
    contact: {
      firstNameRequired: ITranslatedText[];
      lastNameRequired: ITranslatedText[];
      addressRequired: ITranslatedText[];
      mustBeValidEmail: ITranslatedText[];
      emailRequired: ITranslatedText[];
      messageRequired: ITranslatedText[];
      getInTouch: ITranslatedText[];
      firstName: ITranslatedText[];
      lastName: ITranslatedText[];
      email: ITranslatedText[];
      phone: ITranslatedText[];
      address: ITranslatedText[];
      message: ITranslatedText[];
      submit: ITranslatedText[];
    };
    ownFiles: {
      noFilesFound: ITranslatedText[];
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
      enterYourFirstName: [
        { text: "Enter your firstname", language: "en" },
        { text: "Veuillez entrer votre prénom ici", language: "fr" },
      ],
      enterYourLastName: [
        { text: "Enter your lastname here", language: "en" },
        { text: "Veuillez entrer votre nom ici", language: "fr" },
      ],
      role: [
        { text: "Role", language: "en" },
        { text: "Rôle", language: "fr" },
      ],
      updateProfileInformation: [
        { text: "Update", language: "en" },
        { text: "Mettre à jour", language: "fr" },
      ],
      firstNameIsRequired: [
        { text: "Firstname is required", language: "en" },
        { text: "Le prénom est requis", language: "fr" },
      ],
      lastNameIsRequired: [
        { text: "Lastname is required", language: "en" },
        { text: "Le nom est requis", language: "fr" },
      ],
      upload: [
        { text: "Upload", language: "en" },
        { text: "Téléverser", language: "fr" },
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
      home: [
        { language: "en", text: "Home" },
        { language: "fr", text: "Accueil" },
      ],
      chat: [
        { language: "en", text: "Chat" },
        { language: "fr", text: "Chat" },
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
      pages: [
        { language: "en", text: "Pages" },
        { language: "fr", text: "Pages" },
      ],
      profile: [
        { language: "en", text: "Profile" },
        { language: "fr", text: "Profile" },
      ],
      fields: [
        { language: "en", text: "Fields" },
        { language: "fr", text: "Champs" },
      ],
      models: [
        { language: "en", text: "Models" },
        { language: "fr", text: "Modèles" },
      ],
      configuration: [
        { language: "en", text: "Configuration" },
        { language: "fr", text: "Configuration" },
      ],
    },
    fields: {
      createField: [
        { language: "en", text: "Create a field" },
        { language: "fr", text: "Créer un champ" },
      ],
      updateField: [
        { language: "en", text: "Update field" },
        { language: "fr", text: "Modifier un champ" },
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
      searchFields: [
        { language: "en", text: "Search Fields" },
        { language: "fr", text: "Chercher des champs" },
      ],
    },

    models: {
      createModel: [
        { language: "en", text: "Create a Model" },
        { language: "fr", text: "Créer un Modèle" },
      ],
      updateModel: [
        { language: "en", text: "Update Model" },
        { language: "fr", text: "Modifier un Modèle" },
      ],
      namePlaceholder: [
        { language: "en", text: "Name" },
        { language: "fr", text: "Nom" },
      ],
      fieldsPlaceholder: [
        { language: "en", text: "Fields" },
        { language: "fr", text: "Champs" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Soumettre" },
      ],
      language: [
        { language: "en", text: "Language" },
        { language: "fr", text: "Langue" },
      ],
      nameIsRequired: [
        { language: "en", text: "Name is required" },
        { language: "fr", text: "Le nom est requis" },
      ],
    },
    elements: {
      actions: [
        { language: "en", text: "Actions" },
        { language: "fr", text: "Actions" },
      ],
      edit: [
        { language: "en", text: "Edit" },
        { language: "fr", text: "Modifier" },
      ],
      deleteDescription: [
        {
          language: "en",
          text: "Are you sure want you delete the selected elements? You won't be able to recover them once the deletion is made",
        },
        {
          language: "fr",
          text: "Êtes vous sûr de vouloir supprimer les éléments sélectionnés ?",
        },
      ],
      deleteTitle: [
        { language: "en", text: "Delete" },
        { language: "fr", text: "Suppression" },
      ],
    },
    pages: {
      deletePageMessage: [
        {
          language: "en",
          text: "This page is going to be deleted. It won't be able to be recovered. Are you sure?",
        },
        {
          language: "fr",
          text: "Cette page va être supprimé. Il ne sera plus possible de la récupérer après. Êtes-vous sûr ?",
        },
      ],
      deletePage: [
        { language: "en", text: "Delete Page" },
        { language: "fr", text: "Supprimer la page" },
      ],
      addPage: [
        { language: "en", text: "Add Page" },
        { language: "fr", text: "Ajouter une page" },
      ],
      createPage: [
        { language: "en", text: "Create Page" },
        { language: "fr", text: "Créer une page" },
      ],
      delete: [
        { language: "en", text: "Delete" },
        { language: "fr", text: "Supprimer" },
      ],
      language: [
        { language: "en", text: "Language" },
        { language: "fr", text: "Langue" },
      ],
      title: [
        { language: "en", text: "Title" },
        { language: "fr", text: "Titre" },
      ],
      updatePage: [
        { language: "en", text: "Update Page" },
        { language: "fr", text: "Mettre à jour la page" },
      ],
    },
    posts: {
      haveSomethingInMind: [
        { language: "en", text: "Have something in mind?" },
        { language: "fr", text: "Vous avez quelque chose en tête ?" },
      ],
      language: [
        { language: "en", text: "Language" },
        { language: "fr", text: "Langue" },
      ],
      addChildrenPosts: [
        { language: "en", text: "Add children posts" },
        {
          language: "fr",
          text: "Ajouter des postes en tant que postes enfants",
        },
      ],
      createPost: [
        { language: "en", text: "Create Post" },
        { language: "fr", text: "Créer un poste" },
      ],
      design: [
        { language: "en", text: "Design" },
        { language: "fr", text: "Design" },
      ],
      iNeedATitleOrADescription: [
        { language: "en", text: "I need a title or a description" },
        { language: "fr", text: "J'ai besoin d'un titre ou d'une description" },
      ],
      subTitle: [
        { language: "en", text: "Subtitle" },
        { language: "fr", text: "Sous-titre" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Soumettre" },
      ],
      title: [
        { language: "en", text: "Title" },
        { language: "fr", text: "Titre" },
      ],
      visibility: [
        { language: "en", text: "Visibility" },
        { language: "fr", text: "Visibilité" },
      ],
    },
    entities: {
      createEntity: [
        { language: "en", text: "Create" },
        { language: "fr", text: "Créer" },
      ],
      language: [
        { language: "en", text: "Language" },
        { language: "fr", text: "Langue" },
      ],
      required: [
        { language: "en", text: "Required" },
        { language: "fr", text: "Requis" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Soumettre" },
      ],
      updateEntity: [
        { language: "en", text: "Update" },
        { language: "fr", text: "Mettre à jour" },
      ],
    },
    contact: {
      address: [
        { language: "en", text: "Address" },
        { language: "fr", text: "Adresse" },
      ],
      email: [
        { language: "en", text: "Email" },
        { language: "fr", text: "Email" },
      ],
      addressRequired: [
        { language: "en", text: "Addresse is required" },
        { language: "fr", text: "L'adresse est requise" },
      ],
      emailRequired: [
        { language: "en", text: "Email Address is required" },
        { language: "fr", text: "L'adresse email est requise" },
      ],
      firstName: [
        { language: "en", text: "Firstname" },
        { language: "fr", text: "Prénom" },
      ],
      firstNameRequired: [
        { language: "en", text: "Firstname is requinred" },
        { language: "fr", text: "Le prénom est requis" },
      ],
      getInTouch: [
        { language: "en", text: "Get in touch" },
        { language: "fr", text: "Entrons en contact" },
      ],
      lastName: [
        { language: "en", text: "Lastname" },
        { language: "fr", text: "Nom" },
      ],
      lastNameRequired: [
        { language: "en", text: "Lastname is required" },
        { language: "fr", text: "Le nom est requis" },
      ],
      message: [
        { language: "en", text: "Message" },
        { language: "fr", text: "Message" },
      ],
      messageRequired: [
        { language: "en", text: "Message is required" },
        { language: "fr", text: "Le message est requis" },
      ],
      mustBeValidEmail: [
        { language: "en", text: "Must be a valid email" },
        { language: "fr", text: "L'email doit être valide" },
      ],
      phone: [
        { language: "en", text: "Phone" },
        { language: "fr", text: "Numéro de téléphone" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Envoyer" },
      ],
    },
    ownFiles: {
      noFilesFound: [
        { text: "Now files found", language: "en" },
        { text: "Pas de fichiers trouvés", language: "fr" },
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
