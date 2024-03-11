import React from "react";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { ITheme } from "roottypes";

import getLanguages from "../../../../utils/getLanguages";
import Checkbox from "../checkbox";
import { InputSelectOptionEnum } from "../inputSelect/InputSelect";

import useStyles from "./inputLanguages.styles";

interface IInputLanguagesProps {
  value: string[];
  onChange: (languages: string[]) => void;
  theme: ITheme;
}

const InputLanguages: React.FunctionComponent<IInputLanguagesProps> = (
  props: IInputLanguagesProps
) => {
  const [extended, setExtended] = React.useState<boolean>(false);

  const styles = useStyles({ theme: props.theme });
  const languages: InputSelectOptionEnum[] = getLanguages();

  const handleChange = (language: InputSelectOptionEnum) => {
    let newLanguages: string[] = [...props.value];
    const alreadySelected: boolean = newLanguages.some(
      (el) => el === language.value
    );
    if (alreadySelected) {
      newLanguages = newLanguages.filter((el) => el !== language.value);
    } else {
      newLanguages.push(language.value);
    }
    props.onChange(newLanguages);
  };

  return (
    <div className={styles.inputLanguagesContainer}>
      <div className={styles.selectedLanguagesContainer}>
        <AiOutlineArrowsAlt
          color={props.theme.primary}
          className={styles.extendIcon}
          onClick={() => setExtended(!extended)}
        />

        {props.value.map((language, index) => {
          return (
            <img
              className={styles.icon}
              alt="English"
              key={index}
              src={
                "https://unpkg.com/language-icons/icons/" + language + ".svg"
              }
            />
          );
        })}
      </div>
      {extended && (
        <div className={styles.languagesContainer}>
          {languages.map((language, index) => {
            return (
              <div key={index} className={styles.singleLanguageContainer}>
                <img
                  className={styles.icon}
                  alt="English"
                  src={
                    "https://unpkg.com/language-icons/icons/" +
                    language.value +
                    ".svg"
                  }
                />

                <Checkbox
                  theme={props.theme}
                  checked={props.value?.indexOf(language.value) !== -1}
                  labelStyles={{ width: 20 }}
                  label={language.value}
                  onChange={() => handleChange(language)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputLanguages;
