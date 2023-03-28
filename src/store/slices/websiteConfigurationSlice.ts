import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import theme, { Theme } from "../../config/theme";
import IFile from "../../globalTypes/IFile";
import ITranslatedText from "../../globalTypes/ITranslatedText";
import changeTabIcon from "../../utils/changeTabIcon";

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
  tabIcon?: IFile;
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
      update: ITranslatedText[];
      chooseFromYourExistingFiles: ITranslatedText[];
      uploadANewPictureFirst: ITranslatedText[];
      title: ITranslatedText[];
      forgotPassword: ITranslatedText[];
    };
    changePassword: {
      required: ITranslatedText[];
      passwordsMustMatch: ITranslatedText[];
      passwordWasChanged: ITranslatedText[];
      oldPassword: ITranslatedText[];
      newPassword: ITranslatedText[];
      sendChangePasswordRequestTitle: ITranslatedText[];
      email: ITranslatedText[];
      sendChangePasswordRequest: ITranslatedText[];
      send: ITranslatedText[];
      changePasswordRequestHasBeenSent: ITranslatedText[];
      changePasswordTitle: ITranslatedText[];
      confirmPassword: ITranslatedText[];
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
      options: ITranslatedText[];
      addOption: ITranslatedText[];
      label: ITranslatedText[];
      value: ITranslatedText[];
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
      files: ITranslatedText[];
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
    existingFiles: {
      noFilesFound: ITranslatedText[];
    };
    websiteConfiguration: {
      titleIsRequired: ITranslatedText[];
      emailIsRequired: ITranslatedText[];
      phoneNumberIsRequired: ITranslatedText[];
      tabTitleIsRequired: ITranslatedText[];
      websiteConfiguration: ITranslatedText[];
      globalConfiguration: ITranslatedText[];
      title: ITranslatedText[];
      email: ITranslatedText[];
      phoneNumber: ITranslatedText[];
      tabTitle: ITranslatedText[];
      withChat: ITranslatedText[];
      theme: ITranslatedText[];
      revertThemeConfigurationToDefault: ITranslatedText[];
      update: ITranslatedText[];
      withRegistration: ITranslatedText[];

      darkTextColor: ITranslatedText[];
      lightTextColor: ITranslatedText[];

      primary: ITranslatedText[];
      darkerPrimary: ITranslatedText[];
      lighterPrimary: ITranslatedText[];
      secondary: ITranslatedText[];
      errorColor: ITranslatedText[];
      borderColor: ITranslatedText[];
      formMaxWidth: ITranslatedText[];
      transparentBackground: ITranslatedText[];
      backgroundColor: ITranslatedText[];
      contentBackgroundColor: ITranslatedText[];
      subContentBackgroundColor: ITranslatedText[];
      boxColor: ITranslatedText[];
      boxShadow: ITranslatedText[];
      tabIcon: ITranslatedText[];
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
  tabIcon?: IFile;

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
  tabIcon: undefined,

  staticText: {
    profile: {
      forgotPassword: [
        { text: "Forgot your password?", language: "en" },
        { text: "Vous avez oublié votre mot de passe?", language: "fr" },
      ],
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
      update: [
        { text: "Update", language: "en" },
        { text: "Mettre à jour", language: "fr" },
      ],
      chooseFromYourExistingFiles: [
        { text: "Choose from your own", language: "en" },
        { text: "Choisir depuis vos images", language: "fr" },
      ],
      uploadANewPictureFirst: [
        { text: "Upload a new picture first", language: "en" },
        { text: "Veuillez sélectionner une nouvelle image", language: "fr" },
      ],
      title: [
        { text: "Profile", language: "en" },
        { text: "Profile", language: "fr" },
      ],
    },
    changePassword: {
      changePasswordTitle: [
        { text: "Change password", language: "en" },
        { text: "Changer votre mot de passe", language: "fr" },
      ],
      send: [
        { text: "Send", language: "en" },
        { text: "Envoyer", language: "fr" },
      ],
      required: [
        { language: "en", text: "Required" },
        { language: "fr", text: "Requis" },
      ],
      passwordsMustMatch: [
        { language: "en", text: "Passwords must match" },
        { language: "fr", text: "Les mots de passes doivent être identiques" },
      ],
      passwordWasChanged: [
        { language: "en", text: "Password was changed" },
        { language: "fr", text: "Le mot de passe a été changé" },
      ],
      oldPassword: [
        { language: "en", text: "Old password" },
        { language: "fr", text: "Ancien mot de passe" },
      ],
      newPassword: [
        { language: "en", text: "New Password" },
        { language: "fr", text: "Nouveau mot de passe" },
      ],
      confirmPassword: [
        { language: "en", text: "Password confirmation" },
        { language: "fr", text: "Confirmation du mot de passe" },
      ],
      sendChangePasswordRequestTitle: [
        { language: "en", text: "Change password request" },
        { language: "fr", text: "Demande de changement de mot de passe" },
      ],
      email: [
        { language: "en", text: "Email" },
        { language: "fr", text: "Adresse Email" },
      ],

      sendChangePasswordRequest: [
        { text: "Change password request", language: "en" },
        {
          text: "Demande de changement de mot de passe",
          language: "fr",
        },
      ],
      changePasswordRequestHasBeenSent: [
        {
          text: "Change password request has been sent. Check your email!",
          language: "en",
        },
        {
          text: "La demande de changement du mot de passe a été envoyée. Veuillez consulter votre adresse email.",
          language: "fr",
        },
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
      options: [
        { language: "en", text: "Options" },
        { language: "fr", text: "Options" },
      ],
      addOption: [
        { language: "en", text: "Add option" },
        { language: "fr", text: "Ajouter une option" },
      ],
      label: [
        { language: "en", text: "Label" },
        { language: "fr", text: "Label" },
      ],
      value: [
        { language: "en", text: "Value" },
        { language: "fr", text: "Valeur" },
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
      files: [
        { language: "en", text: "Files" },
        { language: "fr", text: "Fichiers" },
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
    existingFiles: {
      noFilesFound: [
        { text: "Now files found", language: "en" },
        { text: "Pas de fichiers trouvés", language: "fr" },
      ],
    },
    websiteConfiguration: {
      email: [
        { text: "Email", language: "en" },
        { text: "Email", language: "fr" },
      ],
      emailIsRequired: [
        { text: "Email is required", language: "en" },
        { text: "L'email est requis", language: "fr" },
      ],
      globalConfiguration: [
        { text: "Global Configuration", language: "en" },
        { text: "Configuration Globale", language: "fr" },
      ],
      phoneNumber: [
        { text: "Phone number", language: "en" },
        { text: "Numéro de téléphone", language: "fr" },
      ],
      phoneNumberIsRequired: [
        { text: "Phone number is required", language: "en" },
        { text: "Le numéro de téléphone est requis", language: "fr" },
      ],
      revertThemeConfigurationToDefault: [
        { text: "Revert theme configuration to default", language: "en" },
        {
          text: "Remettre la configuration du thème aux valeurs par défaut",
          language: "fr",
        },
      ],
      tabTitle: [
        { text: "Tab title", language: "en" },
        { text: "Titre de l'onglet", language: "fr" },
      ],
      tabTitleIsRequired: [
        { text: "Tab title is required", language: "en" },
        { text: "Le titlre de l'onglet est requis", language: "fr" },
      ],
      theme: [
        { text: "Theme", language: "en" },
        { text: "Thème", language: "fr" },
      ],
      title: [
        { text: "Title", language: "en" },
        { text: "Titre", language: "fr" },
      ],
      titleIsRequired: [
        { text: "Title is required", language: "en" },
        { text: "Le titre est requis", language: "fr" },
      ],
      update: [
        { text: "Update", language: "en" },
        { text: "Mettre à jour", language: "fr" },
      ],
      websiteConfiguration: [
        { text: "Website configuration", language: "en" },
        { text: "Configuration du site Web/Application", language: "fr" },
      ],
      withChat: [
        { text: "With Chat", language: "en" },
        { text: "Avec Chat", language: "fr" },
      ],
      withRegistration: [
        { text: "With Registraton", language: "en" },
        {
          text: "Avec la capactié de créer un compte utilisateur",
          language: "fr",
        },
      ],
      darkTextColor: [
        { text: "Dark text color", language: "en" },
        { text: "Couleur du texte sombre", language: "fr" },
      ],
      backgroundColor: [
        { text: "Background couleur", language: "en" },
        { text: "Couleur de l'arrière-plan", language: "fr" },
      ],
      borderColor: [
        { text: "Border color", language: "en" },
        { text: "Couleur de la bordure", language: "fr" },
      ],
      boxColor: [
        { text: "Box Color", language: "en" },
        { text: "Couleur d'un box", language: "fr" },
      ],
      boxShadow: [
        { text: "Box Shadow", language: "en" },
        { text: "Ombre", language: "fr" },
      ],
      contentBackgroundColor: [
        { text: "Content background color", language: "en" },
        { text: "Couleur d'arrière plan du contenu", language: "fr" },
      ],
      darkerPrimary: [
        { text: "Darker primary", language: "en" },
        { text: "Primaire sombre", language: "fr" },
      ],
      errorColor: [
        { text: "Error color", language: "en" },
        { text: "couleur en erreur", language: "fr" },
      ],
      formMaxWidth: [
        { text: "Form max width", language: "en" },
        { text: "Largeur maximale d'un formulaire", language: "fr" },
      ],
      lightTextColor: [
        { text: "Light text color", language: "en" },
        { text: "Couloeur du texte adoucie", language: "fr" },
      ],
      lighterPrimary: [
        { text: "Lighter text color", language: "en" },
        { text: "Couleur du text encore plus adoucie", language: "fr" },
      ],
      primary: [
        { text: "Primary", language: "en" },
        { text: "Primaire", language: "fr" },
      ],
      secondary: [
        { text: "Secondary", language: "en" },
        { text: "Secondaire", language: "fr" },
      ],
      subContentBackgroundColor: [
        { text: "Sub bontent background color", language: "en" },
        { text: "couleur d'arrière-plan du sous-contenu", language: "fr" },
      ],
      transparentBackground: [
        { text: "Transparent backround", language: "en" },
        { text: "Arrière-plan transparent", language: "fr" },
      ],
      tabIcon: [
        { text: "Tab Icon", language: "en" },
        { text: "Icône de l'onglet ", language: "fr" },
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
      state.tabIcon = action.payload.tabIcon;

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
      changeTabIcon(state.tabIcon?.url || "");
    },
  },
});

export default websiteConfigurationSlice.reducer;
