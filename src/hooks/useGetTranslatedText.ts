import ITranslatedText from "../globalTypes/ITranslatedText";
import getNavigatorLanguage from "../utils/getNavigatorLanguage";

const getTranslatedText = (
  translatedTexts: ITranslatedText[] | undefined | string,
  language: string | undefined = getNavigatorLanguage()
): string => {
  if (typeof translatedTexts === "string") return translatedTexts;

  if (!translatedTexts) return "";

  const result: ITranslatedText | undefined = translatedTexts.find(
    (el) => el.language === language
  );

  if (result) {
    return result.text;
  } else {
    return translatedTexts.length > 0 ? translatedTexts[0].text : "";
  }
};

const useGetTranslatedText = () => {
  return getTranslatedText;
};

export default useGetTranslatedText;
