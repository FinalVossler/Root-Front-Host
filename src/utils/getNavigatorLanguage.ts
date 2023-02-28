const getNavigatorLanguage = (): string => {
  const navigatorLanguage: string = navigator.language.split("-")[0];

  return navigatorLanguage;
};

export default getNavigatorLanguage;
