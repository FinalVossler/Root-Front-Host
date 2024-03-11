import React from "react";
import { ITranslatedText } from "roottypes";

import ExtendSection from "../../../fundamentalComponents/extendSection";
import Input from "../../../fundamentalComponents/inputs/input";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import useStyles from "./staticTextsForm.styles";
import { FormikProps } from "formik";
import { IWebsiteConfigurationForm } from "../../editors/websiteConfigurationEditor/WebsiteConfigurationEditor";
import { ExtendSectionSizeEnum } from "../../../fundamentalComponents/extendSection/ExtendSection";
import { useAppSelector } from "../../../../store/hooks";

interface IStaticTextsFormProps {
  language: string;
  name: string;
  formik: FormikProps<IWebsiteConfigurationForm>;
}

const StaticTextsForm: React.FunctionComponent<IStaticTextsFormProps> = (
  props: IStaticTextsFormProps
) => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);

  const [show, setShow] = React.useState<boolean>(false);
  const [shownSections, setShownSections] = React.useState<number[]>([]);

  const styles = useStyles();
  const getTranslatedText = useGetTranslatedText();

  const value = React.useMemo(() => {
    return props.formik.values[props.name];
  }, [props.formik, props.name]);

  const handleTriggerSectionShown = (sectionIndex: number) => () => {
    if (shownSections.includes(sectionIndex)) {
      const newShownSections = [...shownSections];
      newShownSections.splice(shownSections.indexOf(sectionIndex), 1);
      setShownSections(newShownSections);
    } else {
      setShownSections([...shownSections, sectionIndex]);
    }
  };

  const handleOnTextChange =
    ({ key, subKey }: { key: string; subKey: string }) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!value) {
        return;
      }
      const newStaticText = JSON.parse(JSON.stringify(value));
      const text: ITranslatedText | undefined = (
        newStaticText[key][subKey] as ITranslatedText[]
      ).find((el) => el.language === props.language);
      if (text) {
        text.text = e.target.value;
        props.formik.setFieldValue(props.name, newStaticText);
      }
    };

  if (!value) return null;

  return (
    <div className={styles.staticTextsFormContainer}>
      <ExtendSection
        theme={theme}
        isSectionShown={show}
        onClick={() => setShow(!show)}
        title={getTranslatedText(
          props.formik.values[props.name]?.websiteConfiguration
            .staticTextsTranslation
        )}
      />

      <hr className={styles.hr} />

      {show &&
        Object.keys(value).map((key, i) => {
          return (
            <React.Fragment key={i}>
              <ExtendSection
                theme={theme}
                isSectionShown={shownSections.includes(i)}
                onClick={handleTriggerSectionShown(i)}
                title={key}
                size={ExtendSectionSizeEnum.Small}
              />
              {shownSections.includes(i) && (
                <div className={styles.staticTextsSectionTexts}>
                  {Object.keys(value[key]).map((subKey, subKeyIndex) => {
                    return (
                      <Input
                        theme={theme}
                        key={subKeyIndex}
                        onChange={handleOnTextChange({ key, subKey })}
                        label={subKey}
                        name={key + subKey}
                        value={
                          (value[key][subKey] as ITranslatedText[]).find(
                            (el) => el.language === props.language
                          )?.text
                        }
                        debounce
                      />
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default StaticTextsForm;
