import { FormikProps } from "formik";
import React from "react";

import { Theme } from "../../config/theme";

import { useAppSelector } from "../../store/hooks";

import useStyles from "./textarea.styles";

export interface IInput extends React.PropsWithChildren {
  textareaProps?: React.InputHTMLAttributes<HTMLTextAreaElement>;
  name?: string;
  formik?: FormikProps<any>;
  value?: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
  debounce?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => any;
  label?: string;
}
const Textarea: React.FunctionComponent<IInput> = (props: IInput) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const additionalProps = props.debounce
    ? {}
    : {
        value:
          props.value !== undefined && props.value !== null
            ? props.value
            : props.formik?.values[props.name || ""] || "",
      };
  //#endregion Event listeners

  return (
    <div
      className={
        isFocused ? styles.textereaContainerFocused : styles.textereaContainer
      }
    >
      {props.label && <span className={styles.label}>{props.label}</span>}
      {((props.name && props.formik?.values[props.name]) !== undefined ||
        props.value !== undefined) && (
        <textarea
          onBlur={handleFocus}
          onFocus={handleFocus}
          className={styles.textarea}
          name={props.name}
          onChange={handleChange}
          rows={5}
          {...props.textareaProps}
          {...additionalProps}
        />
      )}
      {props.children}

      <span className={styles.textareaError}>
        {/* @ts-ignore */}
        {props.formik?.touched[props.name] && props.formik.errors[props.name]}
        {props.error?.toString()}
      </span>
    </div>
  );
};

export default React.memo(Textarea);
