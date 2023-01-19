import { FormikProps } from "formik";
import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./input.styles";

interface IInput {
  placeholder: string;
  Icon: any;
  inputProps?: any;
  name: string;
  formik: FormikProps<any>;
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
      <props.Icon className={styles.inputIcon} />
      <input
        onBlur={handleFocus}
        onFocus={handleFocus}
        className={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        value={props.formik.values[props.name]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.formik.setFieldValue(props.name, e.target.value)
        }
        {...props.inputProps}
      />

      <span className={styles.inputError}>
        {/* @ts-ignore */}
        {props.formik.touched[props.name] && props.formik.errors[props.name]}
      </span>
    </div>
  );
};

export default React.memo(Input);
