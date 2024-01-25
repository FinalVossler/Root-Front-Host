import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import theme, { ITheme } from "../../config/theme";
import changeTabIcon from "../../utils/changeTabIcon";
import { IFileReadDto, ITranslatedText } from "roottypes";

export interface IWebsiteConfiguration {
  _id?: string;
  title?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
  withTaskManagement?: boolean;
  theme: ITheme;
  tabIcon?: IFileReadDto;
  logo1?: IFileReadDto;
  logo2?: IFileReadDto;
  staticText?: {
    profile: {
      alreadyHaveAnAccount: ITranslatedText[];
      dontHaveAnAccount: ITranslatedText[];
      loginHere: ITranslatedText[];
      registerHere: ITranslatedText[];
      enterFirstName: ITranslatedText[];
      enterLastName: ITranslatedText[];
      enterEmail: ITranslatedText[];
      superAdmin: ITranslatedText[];
      normal: ITranslatedText[];
      superRole: ITranslatedText[];
      updateProfileInformation: ITranslatedText[];
      firstNameIsRequired: ITranslatedText[];
      lastNameIsRequired: ITranslatedText[];
      emailIsRequired: ITranslatedText[];
      update: ITranslatedText[];
      chooseFromYourExistingFiles: ITranslatedText[];
      uploadANewPictureFirst: ITranslatedText[];
      title: ITranslatedText[];
      forgotPassword: ITranslatedText[];
      mustBeOfTypeEmail: ITranslatedText[];
      userInformationUpdated: ITranslatedText[];
      create: ITranslatedText[];
      submit: ITranslatedText[];
      firstName: ITranslatedText[];
      lastName: ITranslatedText[];
      email: ITranslatedText[];
      password: ITranslatedText[];
      passwordConfirmation: ITranslatedText[];
      passwordIsRequired: ITranslatedText[];
      passwordsDontMatch: ITranslatedText[];
      visit: ITranslatedText[];
      role: ITranslatedText[];
      welcome: ITranslatedText[];
      solutionDescription: ITranslatedText[];
      hasMessagingEmailsActivated: ITranslatedText[];
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
      menu: ITranslatedText[];
      markAllUserNotificationAsClicked: ITranslatedText[];
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
      users: ITranslatedText[];
      roles: ITranslatedText[];
      tasksManagement: ITranslatedText[];
      microFrontends: ITranslatedText[];
    };
    fields: {
      createField: ITranslatedText[];
      updateField: ITranslatedText[];
      namePlaceholder: ITranslatedText[];
      typePlaceholder: ITranslatedText[];
      canChooseFromExistingFiles: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      searchFields: ITranslatedText[];
      options: ITranslatedText[];
      addOption: ITranslatedText[];
      label: ITranslatedText[];
      value: ITranslatedText[];
      superiorTo: ITranslatedText[];
      superiorOrEqualTo: ITranslatedText[];
      inferiorTo: ITranslatedText[];
      inferiorOrEqualTo: ITranslatedText[];
      equal: ITranslatedText[];
      addCondition: ITranslatedText[];
      condition: ITranslatedText[];
      field: ITranslatedText[];
      conditionType: ITranslatedText[];
      valueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear: ITranslatedText[];
      required: ITranslatedText[];
      fields: ITranslatedText[];
      contributesInFilling: ITranslatedText[];
      statesConfigurationHint: ITranslatedText[];
      subStatesConfigurationHint: ITranslatedText[];
      mainField: ITranslatedText[];
      stickInTable: ITranslatedText[];
      fieldShowWhenStateIsAchieved: ITranslatedText[];
      ifYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField: ITranslatedText[];

      columnName: ITranslatedText[];
      rowName: ITranslatedText[];
      rows: ITranslatedText[];
      yearTable: ITranslatedText[];
      addColumn: ITranslatedText[];
      addRow: ITranslatedText[];
      tableName: ITranslatedText[];

      conditions: ITranslatedText[];
      statesContributions: ITranslatedText[];
    };
    microFrontends: {
      updateMicroFrontend: ITranslatedText[];
      createMicroFrontend: ITranslatedText[];
      name: ITranslatedText[];
      remoteEntry: ITranslatedText[];
      components: ITranslatedText[];
      addComponent: ITranslatedText[];
      componentName: ITranslatedText[];
      submit: ITranslatedText[];
      warning: ITranslatedText[];
      back: ITranslatedText[];
    };
    models: {
      createModel: ITranslatedText[];
      updateModel: ITranslatedText[];
      namePlaceholder: ITranslatedText[];
      fieldsPlaceholder: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      nameIsRequired: ITranslatedText[];
      addState: ITranslatedText[];
      states: ITranslatedText[];
      addSubState: ITranslatedText[];
      subStates: ITranslatedText[];
      parentStates: ITranslatedText[];
      state: ITranslatedText[];
      subState: ITranslatedText[];
      exclusive: ITranslatedText[];
    };
    events: {
      eventTrigger: ITranslatedText[];
      onCreate: ITranslatedText[];
      onUpdate: ITranslatedText[];
      onClick: ITranslatedText[];
      eventType: ITranslatedText[];
      apiCall: ITranslatedText[];
      redirection: ITranslatedText[];
      addEvent: ITranslatedText[];
      events: ITranslatedText[];
      event: ITranslatedText[];
      requestMethod: ITranslatedText[];
      requestUrl: ITranslatedText[];
      redirectionUrl: ITranslatedText[];
      redirectionToSelf: ITranslatedText[];
      requestData: ITranslatedText[];
      requestDataIsCreatedEntity: ITranslatedText[];
      headers: ITranslatedText[];
      addHeader: ITranslatedText[];
      key: ITranslatedText[];
      value: ITranslatedText[];
      microFrontendRedirection: ITranslatedText[];
      searchMicroFrontends: ITranslatedText[];
      components: ITranslatedText[];
    };
    elements: {
      actions: ITranslatedText[];
      edit: ITranslatedText[];
      deleteTitle: ITranslatedText[];
      deleteDescription: ITranslatedText[];
      copyTitle: ITranslatedText[];
      copyDescription: ITranslatedText[];
      search: ITranslatedText[];
      view: ITranslatedText[];
      table: ITranslatedText[];
      board: ITranslatedText[];
      statusTracking: ITranslatedText[];
      add: ITranslatedText[];
    };
    pages: {
      deletePageMessage: ITranslatedText[];
      deletePage: ITranslatedText[];
      createPage: ITranslatedText[];
      updatePage: ITranslatedText[];
      delete: ITranslatedText[];
      addPage: ITranslatedText[];
      title: ITranslatedText[];
      slug: ITranslatedText[];
      slugError: ITranslatedText[];
      language: ITranslatedText[];
      showInHeader: ITranslatedText[];
      showInSideMenu: ITranslatedText[];
      visit: ITranslatedText[];
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
      code: ITranslatedText[];
      codePlaceholder: ITranslatedText[];
      postUsedInPageAndCantBePrivate: ITranslatedText[];
    };
    entities: {
      createEntity: ITranslatedText[];
      updateEntity: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      required: ITranslatedText[];
      visit: ITranslatedText[];
      success: ITranslatedText[];
      userAssignment: ITranslatedText[];
      searchUsers: ITranslatedText[];
      states: ITranslatedText[];
      createdAt: ITranslatedText[];
      assignedTo: ITranslatedText[];
      taskType: ITranslatedText[];
      mustBeValidUrl: ITranslatedText[];
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
    websiteConfiguration: {
      titleIsRequired: ITranslatedText[];
      emailIsRequired: ITranslatedText[];
      phoneNumberIsRequired: ITranslatedText[];
      tabTitleIsRequired: ITranslatedText[];
      websiteConfiguration: ITranslatedText[];
      globalConfiguration: ITranslatedText[];
      language: ITranslatedText[];
      title: ITranslatedText[];
      description: ITranslatedText[];
      email: ITranslatedText[];
      phoneNumber: ITranslatedText[];
      tabTitle: ITranslatedText[];
      withChat: ITranslatedText[];
      theme: ITranslatedText[];
      revertThemeConfigurationToDefault: ITranslatedText[];
      update: ITranslatedText[];
      withRegistration: ITranslatedText[];
      withTaskManagement: ITranslatedText[];

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
      logo1: ITranslatedText[];
      logo2: ITranslatedText[];
    };
    roles: {
      editConfiguration: ITranslatedText[];
      createRole: ITranslatedText[];
      updateRole: ITranslatedText[];
      namePlaceholder: ITranslatedText[];
      submit: ITranslatedText[];
      language: ITranslatedText[];
      searchRoles: ITranslatedText[];
      permissions: ITranslatedText[];
      entitiesPermisions: ITranslatedText[];
      searchByModel: ITranslatedText[];
      nameIsRequired: ITranslatedText[];

      create: ITranslatedText[];
      read: ITranslatedText[];
      update: ITranslatedText[];
      delete: ITranslatedText[];

      createPage: ITranslatedText[];
      readPage: ITranslatedText[];
      updatePage: ITranslatedText[];
      deletePage: ITranslatedText[];

      createPost: ITranslatedText[];

      createField: ITranslatedText[];
      readField: ITranslatedText[];
      updateField: ITranslatedText[];
      deleteField: ITranslatedText[];

      createModel: ITranslatedText[];
      readModel: ITranslatedText[];
      updateModel: ITranslatedText[];
      deleteModel: ITranslatedText[];

      createUser: ITranslatedText[];
      readUser: ITranslatedText[];
      updateUser: ITranslatedText[];
      deleteUser: ITranslatedText[];

      createMicroFrontend: ITranslatedText[];
      updateMicroFrontend: ITranslatedText[];
      deleteMicroFrontend: ITranslatedText[];

      readRole: ITranslatedText[];
      deleteRole: ITranslatedText[];

      entityFieldPermissions: ITranslatedText[];
      entityEventNotifications: ITranslatedText[];

      onCreate: ITranslatedText[];
      onAssigned: ITranslatedText[];

      addEvent: ITranslatedText[];
      eventTitle: ITranslatedText[];
      eventDescription: ITranslatedText[];
      eventType: ITranslatedText[];
      canAssignToUserFromSameRole: ITranslatedText[];
      roles: ITranslatedText[];
      assignmentConfigurationTitle: ITranslatedText[];
    };
    chat: {
      title: ITranslatedText[];
      welcome: ITranslatedText[];
      welcomeText: ITranslatedText[];
      searchContacts: ITranslatedText[];
      createGroup: ITranslatedText[];
    };
    files: {
      dropHere: ITranslatedText[];
      readAccessOnlyErrorMessage: ITranslatedText[];
      noFilesFound: ITranslatedText[];
    };
  };
}

interface IWebsiteConfigurationState {
  _id?: string;
  title?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  tabTitle?: string;
  mainLanguages?: string[];
  withChat?: boolean;
  withRegistration?: boolean;
  withTaskManagement?: boolean;
  theme: ITheme;
  tabIcon?: IFileReadDto;
  logo1?: IFileReadDto;
  logo2?: IFileReadDto;

  staticText?: IWebsiteConfiguration["staticText"];

  ui: {
    websiteConfigurationEditorOpen: boolean;
  };
}

const initialState: IWebsiteConfigurationState = {
  _id: "",
  title: "",
  description: "",
  email: "",
  phoneNumber: "",
  tabTitle: "",
  mainLanguages: ["en", "fr"],
  withChat: false,
  withRegistration: false,
  withTaskManagement: false,
  theme,
  tabIcon: undefined,
  logo1: undefined,
  logo2: undefined,

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
      enterFirstName: [
        { text: "Enter the firstname here", language: "en" },
        { text: "Veuillez entrer le prénom ici", language: "fr" },
      ],
      enterLastName: [
        { text: "Enter lastname here", language: "en" },
        { text: "Veuillez entrer le nom ici", language: "fr" },
      ],
      enterEmail: [
        { text: "Enter email here", language: "en" },
        { text: "Veuillez entrer l'adresse email ici", language: "fr" },
      ],
      superAdmin: [
        { text: "Super Admin", language: "en" },
        { text: "Super Admin", language: "fr" },
      ],
      normal: [
        { text: "Normal", language: "en" },
        { text: "Normal", language: "fr" },
      ],
      userInformationUpdated: [
        { text: "User information updated", language: "en" },
        { text: "Les Informations ont été mises à jour", language: "fr" },
      ],
      mustBeOfTypeEmail: [
        { text: "Invalid email", language: "en" },
        { text: "Email invalide", language: "fr" },
      ],
      superRole: [
        { text: "Super Role", language: "en" },
        { text: "Super Role", language: "fr" },
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
      emailIsRequired: [
        { text: "Email is required", language: "en" },
        { text: "L'email est requis", language: "fr" },
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
      create: [
        { text: "Create", language: "en" },
        { text: "Créer", language: "fr" },
      ],
      submit: [
        { text: "Submit", language: "en" },
        { text: "Soumettre", language: "fr" },
      ],
      firstName: [
        { text: "Firstname", language: "en" },
        { text: "Prénom", language: "fr" },
      ],
      lastName: [
        { text: "Lastname", language: "en" },
        { text: "Nom", language: "fr" },
      ],
      email: [
        { text: "Email", language: "en" },
        { text: "Adresse email", language: "fr" },
      ],
      role: [
        { text: "Role", language: "en" },
        { text: "Rôle", language: "fr" },
      ],
      password: [
        { text: "Password", language: "en" },
        { text: "Mot de passe", language: "fr" },
      ],
      passwordConfirmation: [
        { text: "Password confirmation", language: "en" },
        { text: "Confirmation du mot de passe", language: "fr" },
      ],
      passwordIsRequired: [
        { text: "Password is required", language: "en" },
        { text: "Le mot de passe est requis", language: "fr" },
      ],
      passwordsDontMatch: [
        { text: "Passwords don't match", language: "en" },
        { text: "Les mots de passe ne sont pas identiques", language: "fr" },
      ],
      visit: [
        { text: "visit", language: "en" },
        { text: "Visiter", language: "fr" },
      ],
      welcome: [
        { text: "Hi there", language: "en" },
        { text: "Bienvenue", language: "fr" },
      ],
      solutionDescription: [
        { text: "About the MarketMaven solution", language: "en" },
        { text: "Détails sur la solution de MarketMaven", language: "fr" },
      ],
      hasMessagingEmailsActivated: [
        {
          text: "Has emails activated for messages notifications",
          language: "en",
        },
        {
          text: "Notifications par emails pour les messages non lus",
          language: "fr",
        },
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
          text: "Sign in to your account",
          language: "en",
        },
        {
          text: "Connectez-vous à votre compte",
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
      menu: [
        { language: "en", text: "Menu" },
        { language: "fr", text: "Menu" },
      ],
      markAllUserNotificationAsClicked: [
        { language: "en", text: "Mark all as read" },
        { language: "fr", text: "Marquer tout comme lu" },
      ],
    },
    registration: {
      title: [
        { language: "en", text: "Create an account" },
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
      users: [
        { language: "en", text: "Users" },
        { language: "fr", text: "Utilisateurs" },
      ],
      roles: [
        { language: "en", text: "Roles" },
        { language: "fr", text: "Rôles" },
      ],
      tasksManagement: [
        { language: "en", text: "Business case Status" },
        { language: "fr", text: "Statut de l'analyse" },
      ],
      microFrontends: [
        { language: "en", text: "Micro-Frontends" },
        { language: "fr", text: "Micro-Frontends" },
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
      canChooseFromExistingFiles: [
        { language: "en", text: "Can pick from existing files" },
        {
          language: "fr",
          text: "On peut choisir à partir d'un fichier existant",
        },
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
      inferiorTo: [
        {
          language: "en",
          text: "Inferior to",
        },
        {
          language: "fr",
          text: "inférieur à",
        },
      ],
      superiorTo: [
        {
          language: "en",
          text: "Superior to",
        },
        {
          language: "fr",
          text: "Supérieur à",
        },
      ],
      superiorOrEqualTo: [
        {
          language: "en",
          text: "Superior or equal to",
        },
        {
          language: "fr",
          text: "Supérieur ou égal à",
        },
      ],
      inferiorOrEqualTo: [
        {
          language: "en",
          text: "Inferior or equal to",
        },
        {
          language: "fr",
          text: "Inférieur ou égal à",
        },
      ],
      equal: [
        {
          language: "en",
          text: "Equal",
        },
        {
          language: "fr",
          text: "Égal",
        },
      ],
      addCondition: [
        {
          language: "en",
          text: "Add Condition",
        },
        {
          language: "fr",
          text: "Ajouter une condition",
        },
      ],
      condition: [
        {
          language: "en",
          text: "Condition",
        },
        {
          language: "fr",
          text: "Condition",
        },
      ],
      field: [
        {
          language: "en",
          text: "Field",
        },
        {
          language: "fr",
          text: "Champ",
        },
      ],
      conditionType: [
        {
          language: "en",
          text: "Operator",
        },
        {
          language: "fr",
          text: "Opérateur",
        },
      ],
      mainField: [
        { language: "en", text: "Main Field?" },
        { language: "fr", text: "Champ Principal ?" },
      ],
      stickInTable: [
        { language: "en", text: "Stick in table?" },
        { language: "fr", text: "Toujours affiché dans les tableaux ?" },
      ],
      valueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear:
        [
          {
            language: "en",
            text: "Value inferior or equal to (current year + value of field), and superior or equal to current year",
          },
          {
            language: "fr",
            text: "Valeur inférieure ou égale à (la valeur de l'année actuelle + la valeur du champ), et supérieur ou égal à la valeur de l'année actuelle",
          },
        ],
      required: [
        {
          language: "en",
          text: "Required",
        },
        {
          language: "fr",
          text: "Requis",
        },
      ],
      fields: [
        { language: "en", text: "Fields" },
        { language: "fr", text: "Champs" },
      ],
      contributesInFilling: [
        { language: "en", text: "Contributes in filing" },
        { language: "fr", text: "Contribue à remplir" },
      ],
      statesConfigurationHint: [
        {
          language: "en",
          text: "States configuration: Field contributes in filling wich states?",
        },
        {
          language: "fr",
          text: "Configuration des états des entités: Le champ contribue dans le remplissage de quels états ?",
        },
      ],
      subStatesConfigurationHint: [
        {
          language: "en",
          text: "Sub-states configuration: Field contributes in filling wich sub-states?",
        },
        {
          language: "fr",
          text: "Configuration des sous-états des entités: Le champ contribue dans le remplissage de quels sous-états ?",
        },
      ],
      fieldShowWhenStateIsAchieved: [
        {
          language: "en",
          text: "Field shown when the following state is achieved",
        },
        {
          language: "fr",
          text: "The champ apparait quand ces les conditions de cet état ont été remplises",
        },
      ],
      ifYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField: [
        {
          language: "en",
          text: "If it's a year table, then the number of years to show in the future is equal to the value of the field",
        },
        {
          language: "fr",
          text: "Si c'est un tableau pour les années, donc le nombre d'années à montrer dans le future est égal à la valeur du champ sélectionné",
        },
      ],
      columnName: [
        {
          language: "en",
          text: "Column name",
        },
        {
          language: "fr",
          text: "Le nom de la colonne",
        },
      ],
      rowName: [
        {
          language: "en",
          text: "Row name",
        },
        {
          language: "fr",
          text: "Le nom de la ligne",
        },
      ],
      rows: [
        {
          language: "en",
          text: "Rows",
        },
        {
          language: "fr",
          text: "Lignes",
        },
      ],
      yearTable: [
        {
          language: "en",
          text: "Year table",
        },
        {
          language: "fr",
          text: "Table d'années",
        },
      ],
      addColumn: [
        {
          language: "en",
          text: "Add column",
        },
        {
          language: "fr",
          text: "Ajouter une colonne",
        },
      ],
      addRow: [
        {
          language: "en",
          text: "Add row",
        },
        {
          language: "fr",
          text: "Ajouter une ligne",
        },
      ],
      tableName: [
        {
          language: "en",
          text: "Table name",
        },
        {
          language: "fr",
          text: "Nome de la table",
        },
      ],
      conditions: [
        {
          language: "en",
          text: "Visibility conditions",
        },
        {
          language: "fr",
          text: "Conditions de visibilité",
        },
      ],
      statesContributions: [
        {
          language: "en",
          text: "States contributions",
        },
        {
          language: "fr",
          text: "Contributions sur les états",
        },
      ],
    },
    microFrontends: {
      createMicroFrontend: [
        { language: "en", text: "Create a Micro-Frontend" },
        { language: "fr", text: "Créer un Micro-Frontend" },
      ],
      updateMicroFrontend: [
        { language: "en", text: "Update a Micro-Frontend" },
        { language: "fr", text: "Mettre à jour un Micro-Frontend" },
      ],
      name: [
        { language: "en", text: "Name" },
        { language: "fr", text: "Nom" },
      ],
      remoteEntry: [
        { language: "en", text: "Remote Entry" },
        { language: "fr", text: "Entrée en remote" },
      ],
      components: [
        { language: "en", text: "Components" },
        { language: "fr", text: "Composants" },
      ],
      addComponent: [
        { language: "en", text: "Add component" },
        { language: "fr", text: "Ajouter un composant" },
      ],
      componentName: [
        { language: "en", text: "Component name" },
        { language: "fr", text: "Nom du composant" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Soumettre" },
      ],

      warning: [
        {
          language: "en",
          text: "WARNING: The appplication will need to be rebuilt for every change or creation in this editor",
        },
        {
          language: "fr",
          text: "ATTENTION: L'application doit être redéployéé pour chaque changement ou ajoué attribué ici",
        },
      ],

      back: [
        { language: "en", text: "Back" },
        { language: "fr", text: "Retour" },
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
      addState: [
        { language: "en", text: "Add State" },
        { language: "fr", text: "Ajout un état" },
      ],
      states: [
        { language: "en", text: "States" },
        { language: "fr", text: "Les états" },
      ],
      subStates: [
        { language: "en", text: "Sub-states" },
        { language: "fr", text: "Sous-états" },
      ],
      addSubState: [
        { language: "en", text: "Add sub-states" },
        { language: "fr", text: "Ajouter des sous-états" },
      ],
      parentStates: [
        { language: "en", text: "Parent states" },
        { language: "fr", text: "Les états parents" },
      ],
      state: [
        { language: "en", text: "State" },
        { language: "fr", text: "État" },
      ],
      subState: [
        { language: "en", text: "Sub-state" },
        { language: "fr", text: "Les sous-états" },
      ],
      exclusive: [
        { language: "en", text: "Is an exclusive state" },
        { language: "fr", text: "Is an exclusive state" },
      ],
    },
    events: {
      eventTrigger: [
        { language: "en", text: "Event trigger" },
        { language: "fr", text: "Déclencheur" },
      ],
      onCreate: [
        { language: "en", text: "On create" },
        { language: "fr", text: "À la création" },
      ],
      onUpdate: [
        { language: "en", text: "On update" },
        { language: "fr", text: "À la mise à jour" },
      ],
      onClick: [
        { language: "en", text: "On click" },
        { language: "fr", text: "Au clique" },
      ],
      eventType: [
        { language: "en", text: "Event type" },
        { language: "fr", text: "Type de l'évènement" },
      ],
      apiCall: [
        { language: "en", text: "API call" },
        { language: "fr", text: "Appel à une API" },
      ],
      redirection: [
        { language: "en", text: "Redirection" },
        { language: "fr", text: "Redirection" },
      ],
      addEvent: [
        { language: "en", text: "Add event" },
        { language: "fr", text: "Ajouter un évènement" },
      ],
      events: [
        { language: "en", text: "Events" },
        { language: "fr", text: "Évènements" },
      ],
      event: [
        { language: "en", text: "Event" },
        { language: "fr", text: "Évènement" },
      ],
      requestMethod: [
        { language: "en", text: "Request method" },
        { language: "fr", text: "Type de la requête" },
      ],
      requestUrl: [
        { language: "en", text: "Request URL" },
        { language: "fr", text: "Url de la requête" },
      ],
      requestData: [
        { language: "en", text: "Request Data (JSON)" },
        { language: "fr", text: "Données de la requête (JSON)" },
      ],
      requestDataIsCreatedEntity: [
        {
          language: "en",
          text: "The request data is the same as the created/updated data",
        },
        {
          language: "fr",
          text: "Le corps de la requête contient les données de l'entité créée our mise à jour.",
        },
      ],
      redirectionUrl: [
        { language: "en", text: "Redirection Url" },
        { language: "fr", text: "Url de redirection" },
      ],
      redirectionToSelf: [
        { language: "en", text: "Redirection to self" },
        { language: "fr", text: "Redirection vers soi" },
      ],
      headers: [
        { language: "en", text: "Headers" },
        { language: "fr", text: "Headers" },
      ],
      addHeader: [
        { language: "en", text: "Add header" },
        { language: "fr", text: "Ajouter un header" },
      ],
      key: [
        { language: "en", text: "Key" },
        { language: "fr", text: "Clé" },
      ],
      value: [
        { language: "en", text: "Value" },
        { language: "fr", text: "Valeur" },
      ],
      microFrontendRedirection: [
        { language: "en", text: "Redirection to MicroFrontend" },
        { language: "fr", text: "Redirection vers un Micro-Frontend" },
      ],
      searchMicroFrontends: [
        { language: "en", text: "Search a MicroFrontend" },
        { language: "fr", text: "Rechercher un Micro-Frontend" },
      ],
      components: [
        { language: "en", text: "Components" },
        { language: "fr", text: "Composants" },
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
      copyTitle: [
        { language: "en", text: "Copy elements?" },
        { language: "fr", text: "Copie des éléments ?" },
      ],
      copyDescription: [
        {
          language: "en",
          text: "Are you sure you want to copy this(these) element(s)?",
        },
        {
          language: "fr",
          text: "Êtes-vous sûr de vouloir copier ce(s) élément(s) ?",
        },
      ],
      search: [
        { language: "en", text: "Search" },
        { language: "fr", text: "Chercher des éléments" },
      ],
      view: [
        { language: "en", text: "View" },
        { language: "fr", text: "Vue" },
      ],
      table: [
        { language: "en", text: "Table" },
        { language: "fr", text: "Lignes " },
      ],
      board: [
        { language: "en", text: "Board" },
        { language: "fr", text: "Cartes " },
      ],
      statusTracking: [
        { language: "en", text: "Status Tracking" },
        { language: "fr", text: "Suivi de statut" },
      ],
      add: [
        { language: "en", text: "Add" },
        { language: "fr", text: "Ajouter " },
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
      slug: [
        { language: "en", text: "Slug" },
        { language: "fr", text: "Slug" },
      ],
      slugError: [
        { language: "en", text: "No spaces allowed" },
        { language: "fr", text: "Espaces interdits" },
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
      showInHeader: [
        { language: "en", text: "Show in header" },
        { language: "fr", text: "Montrer dans l'entête" },
      ],
      showInSideMenu: [
        { language: "en", text: "Show in side menu" },
        { language: "fr", text: "Montrer dans le menu de Côté" },
      ],
      visit: [
        { language: "en", text: "Visit" },
        { language: "fr", text: "Visiter" },
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
      code: [
        { language: "en", text: "Code" },
        { language: "fr", text: "Code" },
      ],
      codePlaceholder: [
        { language: "en", text: "Model Id, etc..." },
        { language: "fr", text: "Id du modèle, etc..." },
      ],
      postUsedInPageAndCantBePrivate: [
        {
          language: "en",
          text: "This post is used in a page and can't be set to private.",
        },
        {
          language: "fr",
          text: "Ce poste est déjà utilisé dans une page et ne peux pas être mis à privé.",
        },
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
      visit: [
        { text: "visit", language: "en" },
        { text: "Visiter", language: "fr" },
      ],
      success: [
        { text: "Success", language: "en" },
        { text: "Succès", language: "fr" },
      ],
      userAssignment: [
        { text: "User assignments", language: "en" },
        { text: "Assignations des utilisateurs", language: "fr" },
      ],
      searchUsers: [
        { text: "Search users", language: "en" },
        { text: "Chercher des utilisateurs", language: "fr" },
      ],
      states: [
        { language: "en", text: "States" },
        { language: "fr", text: "États" },
      ],
      createdAt: [
        { language: "en", text: "Created on" },
        { language: "fr", text: "Créée en" },
      ],
      assignedTo: [
        { language: "en", text: "Assigned to" },
        { language: "fr", text: "Assigné à" },
      ],

      taskType: [
        { language: "en", text: "On hold by" },
        { language: "fr", text: "En attente de" },
      ],

      mustBeValidUrl: [
        { language: "en", text: "Must be a valid URL" },
        { language: "fr", text: "Doit être un Url valide" },
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
      language: [
        { text: "Language", language: "en" },
        { text: "Lange", language: "fr" },
      ],
      title: [
        { text: "Title", language: "en" },
        { text: "Titre", language: "fr" },
      ],
      description: [
        { text: "Description", language: "en" },
        { text: "Description", language: "fr" },
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
      withTaskManagement: [
        { text: "With Task Management", language: "en" },
        {
          text: "Avec la gestion de tâches",
          language: "fr",
        },
      ],
      darkTextColor: [
        { text: "Dark text color", language: "en" },
        { text: "Couleur du texte sombre", language: "fr" },
      ],
      backgroundColor: [
        { text: "Background color", language: "en" },
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
        { text: "Lighter primary", language: "en" },
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
      logo1: [
        { text: "Main Logo", language: "en" },
        { text: "Logo principale", language: "fr" },
      ],
      logo2: [
        { text: "Secondary logo", language: "en" },
        { text: "Logo secondaire", language: "fr" },
      ],
    },

    roles: {
      editConfiguration: [
        { language: "en", text: "Edit configuration" },
        { language: "fr", text: "Modifier la configuration" },
      ],
      entitiesPermisions: [
        { language: "en", text: "Entities Permissions" },
        { language: "fr", text: "Permissions des entités" },
      ],
      searchByModel: [
        { language: "en", text: "Search by model" },
        { language: "fr", text: "Rechercher par modèle" },
      ],
      nameIsRequired: [
        { language: "en", text: "Name is required" },
        { language: "fr", text: "Le nom est requis" },
      ],
      createRole: [
        { language: "en", text: "Create a role" },
        { language: "fr", text: "Créer un rôle" },
      ],
      updateRole: [
        { language: "en", text: "Update role" },
        { language: "fr", text: "Modifier un rôle" },
      ],
      namePlaceholder: [
        { language: "en", text: "Name" },
        { language: "fr", text: "Nom" },
      ],
      submit: [
        { language: "en", text: "Submit" },
        { language: "fr", text: "Soumettre" },
      ],
      language: [
        { language: "en", text: "Language" },
        { language: "fr", text: "Langue" },
      ],
      searchRoles: [
        { language: "en", text: "Search Roles" },
        { language: "fr", text: "Chercher des rôles" },
      ],
      permissions: [
        { language: "en", text: "Permissions" },
        { language: "fr", text: "Permissions" },
      ],
      createPage: [
        { language: "en", text: "Create page" },
        { language: "fr", text: "Créer une page" },
      ],
      readPage: [
        { language: "en", text: "Read page" },
        { language: "fr", text: "Lire une page" },
      ],
      updatePage: [
        { language: "en", text: "Update page" },
        { language: "fr", text: "Mettre un jour une page" },
      ],
      deletePage: [
        { language: "en", text: "Delete page" },
        { language: "fr", text: "Supprimer une page" },
      ],

      createPost: [
        { language: "en", text: "Create post" },
        { language: "fr", text: "Créer une publication" },
      ],

      createField: [
        { language: "en", text: "Create field" },
        { language: "fr", text: "Créer un champ" },
      ],
      readField: [
        { language: "en", text: "Read field" },
        { language: "fr", text: "Like un champ" },
      ],
      updateField: [
        { language: "en", text: "Update field" },
        { language: "fr", text: "Mettre un jour un champ" },
      ],
      deleteField: [
        { language: "en", text: "Delete field" },
        { language: "fr", text: "Supprmier un champ" },
      ],

      createModel: [
        { language: "en", text: "Create model" },
        { language: "fr", text: "Créer un modèle" },
      ],
      readModel: [
        { language: "en", text: "Read model" },
        { language: "fr", text: "Lire un modèle" },
      ],
      updateModel: [
        { language: "en", text: "Update model" },
        { language: "fr", text: "Mettre un jour un modèle" },
      ],
      deleteModel: [
        { language: "en", text: "Delete model" },
        { language: "fr", text: "Supprmier un modèle" },
      ],

      createUser: [
        { language: "en", text: "Create user" },
        { language: "fr", text: "Créer un utilisateur" },
      ],
      readUser: [
        { language: "en", text: "Read user" },
        { language: "fr", text: "Lire un utilisateur" },
      ],
      updateUser: [
        { language: "en", text: "Update user" },
        { language: "fr", text: "Mettre un jour un utilisateur" },
      ],
      deleteUser: [
        { language: "en", text: "Delete user" },
        { language: "fr", text: "Supprimer un utilisateur" },
      ],
      readRole: [
        { language: "en", text: "Read role" },
        { language: "fr", text: "Lire un rôle" },
      ],
      deleteRole: [
        { language: "en", text: "Delete role" },
        { language: "fr", text: "Supprimer un rôle" },
      ],

      createMicroFrontend: [
        { language: "en", text: "Create Micro-Frontend" },
        { language: "fr", text: "Créer un Micro-Frontend" },
      ],
      updateMicroFrontend: [
        { language: "en", text: "Update Micro-Frontend" },
        { language: "fr", text: "Mettre à jour un Micro-Frontend" },
      ],
      deleteMicroFrontend: [
        { language: "en", text: "Delete Micro-Frontend" },
        { language: "fr", text: "Supprimer un Micro-Frontend" },
      ],
      create: [
        { language: "en", text: "Create" },
        { language: "fr", text: "Créer" },
      ],
      update: [
        { language: "en", text: "Update" },
        { language: "fr", text: "Mettre à jour" },
      ],
      read: [
        { language: "en", text: "Read" },
        { language: "fr", text: "Lire" },
      ],
      delete: [
        { language: "en", text: "Delete" },
        { language: "fr", text: "Supprimer" },
      ],
      entityFieldPermissions: [
        {
          language: "en",
          text: "Field permissions",
        },
        {
          language: "fr",
          text: "Permissions des champs",
        },
      ],
      entityEventNotifications: [
        {
          language: "en",
          text: "Event notifications",
        },
        {
          language: "fr",
          text: "Notifications sur les évènements",
        },
      ],
      onCreate: [
        {
          language: "en",
          text: "On create",
        },
        {
          language: "fr",
          text: "Suite à la création",
        },
      ],
      onAssigned: [
        {
          language: "en",
          text: "On assigned",
        },
        {
          language: "fr",
          text: "À l'assignation",
        },
      ],
      addEvent: [
        {
          language: "en",
          text: "Add Event",
        },
        {
          language: "fr",
          text: "Ajouter un évènement",
        },
      ],
      eventTitle: [
        {
          language: "en",
          text: "Event title",
        },
        {
          language: "fr",
          text: "Titre de l'évènement",
        },
      ],
      eventDescription: [
        {
          language: "en",
          text: "Event description",
        },
        {
          language: "fr",
          text: "Description de l'évènement",
        },
      ],
      eventType: [
        {
          language: "en",
          text: "Event type",
        },
        {
          language: "fr",
          text: "Type de l'évènement",
        },
      ],
      canAssignToUserFromSameRole: [
        {
          language: "en",
          text: "Can assign to users from the same role",
        },
        {
          language: "fr",
          text: "On peut assigner aux utilisateurs ayant le même rôle",
        },
      ],

      roles: [
        {
          language: "en",
          text: "Other roles to which this role can assign usrs",
        },
        {
          language: "fr",
          text: "Autres rôles auxquel l'utilisateur ayant ce rôle peut assigner cette entité",
        },
      ],
      assignmentConfigurationTitle: [
        {
          language: "en",
          text: "User Assignment configuration",
        },
        {
          language: "fr",
          text: "Configuration sur l'assignmnt des utilisateurs",
        },
      ],
    },
    chat: {
      title: [
        { language: "en", text: "Chat" },
        { language: "fr", text: "Chat" },
      ],
      welcome: [
        { language: "en", text: "Welcome" },
        { language: "fr", text: "Bienvenue" },
      ],
      welcomeText: [
        { language: "en", text: "Please select a contact to start messaging" },
        {
          language: "fr",
          text: "Veuillez sélectionner un contact pour commencer à chatter :)",
        },
      ],
      searchContacts: [
        { language: "en", text: "Search Contacts" },
        { language: "fr", text: "Rechercher des contacts" },
      ],
      createGroup: [
        { language: "en", text: "Create group" },
        { language: "fr", text: "Créer un groupe" },
      ],
    },
    files: {
      dropHere: [
        { language: "en", text: "Drop here" },
        { language: "fr", text: "Glisser déposer" },
      ],
      readAccessOnlyErrorMessage: [
        {
          language: "en",
          text: "You don't have the right to update this field",
        },
        {
          language: "fr",
          text: "Vous n'avez pas le droit de mettre à jour ce champ",
        },
      ],
      noFilesFound: [
        { text: "No files found", language: "en" },
        { text: "Pas de fichiers trouvés", language: "fr" },
      ],
    },
  },
  ui: {
    websiteConfigurationEditorOpen: false,
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
      (state.description = action.payload.description),
        (state.phoneNumber = action.payload.phoneNumber);
      state.tabTitle = action.payload.tabTitle;
      state.mainLanguages = action.payload.mainLanguages;
      state.withChat = action.payload.withChat;
      state.withRegistration = action.payload.withRegistration;
      state.withTaskManagement = action.payload.withTaskManagement;
      state.theme = action.payload.theme;
      state.tabIcon = action.payload.tabIcon;
      state.logo1 = action.payload.logo1;
      state.logo2 = action.payload.logo2;

      // We override the initial values defined here by whatever is stored in the database
      // But we keep the values that aren't stored in the db.
      // This is so when we make modifications to the initial state after adding new text to the project,
      // and when we already have something stored in the database, the text here won't be overridden.
      if (action.payload.staticText) {
        if (!state.staticText) {
          state.staticText = action.payload.staticText;
        } else {
          Object.keys(action.payload.staticText).forEach((key) => {
            //@ts-ignore
            Object.keys(action.payload.staticText?.[key]).forEach(
              (childKey) => {
                if (!state.staticText) {
                  state.staticText = action.payload.staticText;
                } else {
                  state.staticText = {
                    ...state.staticText,
                    [key]: {
                      //@ts-ignore
                      ...state.staticText?.[key],
                      //@ts-ignore

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
    setEditorOpen: (
      state: IWebsiteConfigurationState,
      action: PayloadAction<boolean>
    ) => {
      state.ui.websiteConfigurationEditorOpen = action.payload;
    },
  },
});

export default websiteConfigurationSlice.reducer;
