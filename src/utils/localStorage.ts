export const FIELDS_LOCAL_STORAGE_CONF_NAME = "FIELDS";

export enum LocalStorageConfNameEnum {
  FIELDS = "FIELDS",
  MODELS = "MODELS",
  USERS = "USERS",
  ROLES = "ROLES",
  MICRO_FRONTENDS = "MICRO_FRONTENDS",
}

// For the "Elements" component
export interface IElementsConf {
  hiddenColumnNames: string[];
}

export const updateLocalStorageElementsConf = ({
  confName,
  value,
}: {
  confName: LocalStorageConfNameEnum | string;
  value: IElementsConf;
}) => {
  window.localStorage.setItem(confName, JSON.stringify(value));
};

export const getLocalStorageElementsConf = (
  confName: LocalStorageConfNameEnum | string
): IElementsConf | null => {
  let resultFromStorage = window.localStorage.getItem(confName);

  if (resultFromStorage) {
    try {
      const finalResult = JSON.parse(resultFromStorage) as IElementsConf;
      return finalResult;
    } catch (e) {}
  }

  return null;
};
