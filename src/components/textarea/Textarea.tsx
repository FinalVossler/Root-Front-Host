import { FormikProps } from "formik";
import React from "react";
import debounce from "lodash.debounce";

import { ITheme } from "../../config/theme";

import { useAppSelector } from "../../store/hooks";

import useStyles from "./textarea.styles";

export interface ITextareaProps {
  textareaProps?: React.InputHTMLAttributes<HTMLTextAreaElement> & {
    ["data-cy"]?: string;
  };
  name?: string;
  formik?: FormikProps<any>;
  value?: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
  debounce?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement, Element>) => any;
  label?: string;
}
const Textarea: React.FunctionComponent<
  React.PropsWithChildren<ITextareaProps>
> = (props: React.PropsWithChildren<ITextareaProps>) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current !== null && props.debounce) {
      textareaRef.current.value = props.value;
    }
  }, [props.value]);

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

  const debouncedChange = debounce(handleChange, 500);

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
          ref={textareaRef}
          onBlur={handleFocus}
          onFocus={handleFocus}
          className={styles.textarea}
          name={props.name}
          onChange={props.debounce ? debouncedChange : handleChange}
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
