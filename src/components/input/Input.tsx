import { FormikProps } from "formik";
import React from "react";
import debounce from "lodash.debounce";

import { Theme } from "../../config/theme";

import useStyles from "./input.styles";
import { useAppSelector } from "../../store/hooks";

interface IInput {
  Icon?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  formik?: FormikProps<any>;
  value?: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  debounce?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => any;
  label?: string;
}
const Input: React.FunctionComponent<IInput> = (props: IInput) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  //#region Event listeners
  const handleFocus = (e: any) => {
    const focused: boolean = e.target === document.activeElement;

    if (props.onFocus && focused) props.onFocus(e);
    setIsFocused(e.target === document.activeElement);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, e.target.value);
    }
  };

  const debouncedChange = debounce(handleChange, 500);

  const additionalProps = props.debounce
    ? {}
    : { value: props.formik?.values[props.name || ""] || props.value || "" };
  //#endregion Event listeners

  return (
    <div
      className={
        isFocused ? styles.inputContainerFocused : styles.inputContainer
      }
    >
      <div className={styles.labelAndInputContainer}>
        {props.label && <span className={styles.label}>{props.label}</span>}
        {props.Icon && (
          <props.Icon
            className={
              props.label ? styles.inputIconWithLabel : styles.inputIcon
            }
          />
        )}
        {((props.name && props.formik?.values[props.name]) !== undefined ||
          props.value !== undefined) && (
          <input
            onBlur={handleFocus}
            onFocus={handleFocus}
            className={props.label ? styles.inputWithLabel : styles.input}
            name={props.name}
            onChange={props.debounce ? debouncedChange : handleChange}
            {...props.inputProps}
            {...additionalProps}
          />
        )}
      </div>

      <span className={styles.inputError}>
        {/* @ts-ignore */}
        {props.formik?.touched[props.name] && props.formik.errors[props.name]}
        {props.error?.toString()}
      </span>
    </div>
  );
};

export default React.memo(Input);
