import React, { PropsWithChildren } from "react";
import debounce from "lodash.debounce";
import { ITheme } from "roottypes";

import useStyles from "./input.styles";

export interface IInputProps {
  Icon?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  value?: any;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  debounce?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => any;
  label?: string;
  onIconClick?: (somehting: any) => void;
  iconColor?: string;
  containerProps?: any;
  inputDataCy?: string;
  inputErrorDataCy?: string;
  labelStyles?: React.CSSProperties;
  theme: ITheme;
}
const Input: React.FunctionComponent<PropsWithChildren<IInputProps>> = (
  props: PropsWithChildren<IInputProps>
) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const styles = useStyles({ theme: props.theme });
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
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const debouncedChange = debounce(handleChange, 600);

  const additionalProps = props.debounce
    ? {}
    : {
        value:
          props.value !== undefined && props.value !== null ? props.value : "",
      };
  //#endregion Event listeners

  const iconStyles = props.iconColor
    ? { color: props.iconColor }
    : {
        color: props.inputProps?.disabled
          ? props.theme.lightTextColor
          : props.theme.primary,
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
        {props.label && (
          <span
            className={styles.label}
            style={{ ...(props.labelStyles || {}) }}
          >
            {props.label}
          </span>
        )}
        {props.Icon && (
          <props.Icon
            onClick={props.onIconClick}
            className={
              props.label ? styles.inputIconWithLabel : styles.inputIcon
            }
            style={iconStyles}
          />
        )}
        {props.value !== undefined && (
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
            {...(props.inputDataCy ? { ["data-cy"]: props.inputDataCy } : {})}
          />
        )}
        {props.children}
      </div>

      <span
        className={styles.inputError}
        {...(props.inputErrorDataCy
          ? { ["data-cy"]: props.inputErrorDataCy }
          : {})}
      >
        {props.error?.toString()}
      </span>
    </div>
  );
};

export default React.memo(Input);
