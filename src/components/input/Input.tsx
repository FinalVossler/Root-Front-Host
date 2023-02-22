import { FormikProps } from "formik";
import React from "react";
import { useTheme } from "react-jss";
import debounce from "lodash.debounce";

import { Theme } from "../../config/theme";

import useStyles from "./input.styles";

interface IInput {
  Icon?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  formik?: FormikProps<any>;
  value?: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  debounce?: boolean;
  isFocused?: boolean;
}
const Input: React.FunctionComponent<IInput> = (props: IInput) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  React.useEffect(() => {
    if (props.isFocused !== undefined) setIsFocused(props.isFocused);
  }, [props.isFocused]);

  //#region Event listeners
  const handleFocus = (e: any) => {
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
      {props.Icon && <props.Icon className={styles.inputIcon} />}
      {((props.name && props.formik?.values[props.name]) !== undefined ||
        props.value !== undefined) && (
        <input
          onBlur={handleFocus}
          onFocus={handleFocus}
          className={styles.input}
          name={props.name}
          onChange={props.debounce ? debouncedChange : handleChange}
          {...props.inputProps}
          {...additionalProps}
        />
      )}

      <span className={styles.inputError}>
        {/* @ts-ignore */}
        {props.formik?.touched[props.name] && props.formik.errors[props.name]}
        {props.error?.toString()}
      </span>
    </div>
  );
};

export default React.memo(Input);
