import { ITranslatedText } from "roottypes";
import { useAppSelector } from "../store/hooks";

const getTranslatedText =
  (userPreferenceLanguage: string) =>
  (
    translatedTexts: ITranslatedText[] | undefined | string,
    language: string | undefined = userPreferenceLanguage
  ): string => {
    if (
      typeof translatedTexts === "string" ||
      typeof translatedTexts === "number"
    )
      return translatedTexts;

    if (typeof translatedTexts === "boolean")
      return (translatedTexts as Boolean).toString();

    if (!translatedTexts) return "";

    const result: ITranslatedText | undefined = translatedTexts.find(
      (el) => el.language === language
    );

    if (result && result.text?.trim() !== "<p><br></p>") {
      return result.text || "";
    } else {
      return translatedTexts.length > 0 ? translatedTexts[0].text : "";
    }
  };

const useGetTranslatedText = () => {
  const userPreferenceLanguage: string = useAppSelector(
    (state) => state.userPreferences.language
  );

  return getTranslatedText(userPreferenceLanguage);
};

export default useGetTranslatedText;
