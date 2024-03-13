import React from "react";
import Select, { PropsValue } from "react-select";
import { ITheme } from "roottypes";

import useStyles from "./inputSelect.styles";

export type IInputSelectOption = {
  value: string;
  label: string;
};

export interface IInputSelectProps {
  options: IInputSelectOption[];
  label: string;
  onChange?: (option: IInputSelectOption) => void;
  onMultiChange?: (options: IInputSelectOption[]) => void;
  isMulti?: boolean;
  value?: IInputSelectOption | IInputSelectOption[];
  name?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  selectorClassName?: string;
  theme: ITheme;
}

const InputSelect: React.FunctionComponent<IInputSelectProps> = (
  props: IInputSelectProps
) => {
  const styles = useStyles({ theme: props.theme });

  const handleOnChange = (option: IInputSelectOption) => {
    if (props.onChange) {
      props.onChange(option as IInputSelectOption);
    }
  };

  const handleOnMultiChange = (optionsParams: IInputSelectOption[]) => {
    const options: IInputSelectOption[] = optionsParams;

    console.log("options", options);

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
          //@ts-ignore
          onChange={props.isMulti ? handleOnMultiChange : handleOnChange}
          options={props.options}
          isDisabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          className={
            (props.disabled ? styles.dislabedSelect : styles.select) +
            (props.selectorClassName ? " " + props.selectorClassName : "")
          }
          classNamePrefix="react-select"
          data-cy="inputSelect"
        />
      </div>

      <span className={styles.inputError}>{props.error?.toString()}</span>
    </div>
  );
};

export default React.memo(InputSelect);
