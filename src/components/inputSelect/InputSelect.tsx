import { FormikProps } from "formik";
import React from "react";
import Select, { PropsValue } from "react-select";

import { ITheme } from "../../config/theme";
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
  onMultiChange?: (options: Option[]) => void;
  isMulti?: boolean;
  value?: Option | Option[];
  formik?: FormikProps<any>;
  name?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  selectorClassName?: string;
}

const InputSelect: React.FunctionComponent<IInputSelect> = (
  props: IInputSelect
) => {
  const theme: ITheme = useAppSelector(
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

  const handleOnMultiChange = (optionsParams: any) => {
    const options: Option[] = optionsParams;
    if (props.formik && props.name) {
      props.formik.setFieldValue(
        props.name,
        options.map((option) => option.value)
      );
    }

    if (props.onMultiChange) {
      props.onMultiChange(options);
    }
  };

  return (
    <div className={styles.inputSelectContainer} style={props.style || {}}>
      <div className={styles.labelAndInputSelectContainer}>
        {props.label && (
          <span className={styles.selectLabel}>{props.label}:</span>
        )}
        <Select
          isMulti={props.isMulti}
          onChange={props.isMulti ? handleOnMultiChange : handleOnChange}
          options={props.options}
          isDisabled={props.disabled}
          placeholder={props.placeholder}
          value={
            props.formik && props.name && !props.isMulti
              ? props.options.find(
                  (option) =>
                    option.value === props.formik?.values[props.name || ""]
                )
              : props.formik && props.name && props.isMulti
              ? props.options.filter((option) =>
                  Boolean(
                    props.formik?.values[props.name || ""].find(
                      (selectedOption: string) =>
                        selectedOption.toString() === option.value.toString()
                    )
                  )
                )
              : props.value
          }
          className={
            (props.disabled ? styles.dislabedSelect : styles.select) +
            (props.selectorClassName ? " " + props.selectorClassName : "")
          }
          classNamePrefix="react-select"
          data-cy="inputSelect"
        />
      </div>

      <span className={styles.inputError}>
        {/* @ts-ignore */}
        {props.formik?.touched[props.name] &&
          props.formik?.errors[props.name || ""]}
        {props.error?.toString()}
      </span>
    </div>
  );
};

export default React.memo(InputSelect);
