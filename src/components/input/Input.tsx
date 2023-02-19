import { FormikProps } from "formik";
import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./input.styles";

interface IInput {
  Icon?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  formik?: FormikProps<any>;
  value?: any;
  error?: string;
}
const Input: React.FunctionComponent<IInput> = (props: IInput) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const theme: Theme = useTheme();

  const styles = useStyles({ theme });

  const handleFocus = (e: any) => {
    setIsFocused(e.target === document.activeElement);
  };

  return (
    <div
      className={
        isFocused ? styles.inputContainerFocused : styles.inputContainer
      }
    >
      {props.Icon && <props.Icon className={styles.inputIcon} />}
      {((props.name && props.formik?.values[props.name]) !== undefined ||
        props.value) && (
        <input
          onBlur={handleFocus}
          onFocus={handleFocus}
          className={styles.input}
          name={props.name}
          value={props.formik?.values[props.name || ""] || props.value || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (props.formik && props.name) {
              props.formik.setFieldValue(props.name, e.target.value);
            }
          }}
          {...props.inputProps}
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
