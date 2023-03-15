import { FormikProps } from "formik";
import React from "react";
import Select, { PropsValue } from "react-select";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./inputSelect.styles";

export type Option = {
  value: string;
  label: string;
};

interface IInputSelect {
  options: Option[];
  label: string;
  onChange?: (option: Option) => void;
  isMulti?: boolean;
  value: Option;
  formik?: FormikProps<any>;
  name?: string;
  style?: React.CSSProperties;
}

const InputSelect: React.FunctionComponent<IInputSelect> = (
  props: IInputSelect
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const handleOnChange = (option: PropsValue<Option>) => {
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, (option as Option).value);
    }

    if (props.onChange) {
      props.onChange(option as Option);
    }
  };

  return (
    <div className={styles.inputSelectContainer} style={props.style || {}}>
      {props.label && (
        <span className={styles.selectLabel}>{props.label}:</span>
      )}
      <Select
        isMulti={props.isMulti}
        onChange={handleOnChange}
        options={props.options}
        value={
          props.formik && props.name
            ? props.options.find(
                (option) =>
                  option.value === props.formik?.values[props.name || ""]
              )
            : props.value
        }
        className={styles.select}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default React.memo(InputSelect);
