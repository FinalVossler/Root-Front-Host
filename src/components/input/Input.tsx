import { FormikProps } from "formik";
import React from "react";
import debounce from "lodash.debounce";
import classnames from "classnames";

import { Theme } from "../../config/theme";

import useStyles from "./input.styles";
import { useAppSelector } from "../../store/hooks";

export interface IInput extends React.PropsWithChildren {
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
  onIconClick?: (any) => void;
  iconColor?: string;
  containerProps?: any;
}
const Input: React.FunctionComponent<IInput> = (props: IInput) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current !== null && props.debounce) {
      inputRef.current.value = props.value;
    }
  }, [props.value]);

  //#region Event listeners
  const handleFocus = (e: any) => {
    const focused: boolean = e.target === document.activeElement;

    if (props.onFocus && focused) props.onFocus(e);
    setIsFocused(e.target === document.activeElement);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.formik && props.name && !props.onChange) {
      props.formik.setFieldValue(props.name, e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const debouncedChange = debounce(handleChange, 600);

  const additionalProps = props.debounce
    ? {}
    : {
        value:
          props.value !== undefined && props.value !== null
            ? props.value
            : props.formik?.values[props.name || ""] || "",
      };
  //#endregion Event listeners

  const iconStyles = props.iconColor
    ? { color: props.iconColor }
    : {
        color: props.inputProps?.disabled
          ? theme.lightTextColor
          : theme.primary,
      };
  return (
    <div
      className={
        isFocused ? styles.inputContainerFocused : styles.inputContainer
      }
      {...props.containerProps}
    >
      <div
        className={
          props.inputProps?.disabled
            ? styles.labelAndInputDisabled
            : styles.labelAndInputContainer
        }
      >
        {props.label && <span className={styles.label}>{props.label}</span>}
        {props.Icon && (
          <props.Icon
            onClick={props.onIconClick}
            className={
              props.label ? styles.inputIconWithLabel : styles.inputIcon
            }
            style={iconStyles}
          />
        )}
        {((props.name && props.formik?.values[props.name]) !== undefined ||
          props.value !== undefined) && (
          <input
            ref={inputRef}
            onBlur={handleFocus}
            onFocus={handleFocus}
            className={props.label ? styles.inputWithLabel : styles.input}
            name={props.name}
            onChange={props.debounce ? debouncedChange : handleChange}
            style={{
              paddingLeft: props.Icon ? 37 : 10,
            }}
            {...props.inputProps}
            {...additionalProps}
          />
        )}
        {props.children}
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

export default React.memo(Input);
