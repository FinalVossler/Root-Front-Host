import React from "react";
import Select, { PropsValue } from "react-select";

import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./inputSelect.styles";
import { ITheme } from "roottypes";

export type InputSelectOptionEnum = {
  value: string;
  label: string;
};

export interface IInputSelectProps {
  options: InputSelectOptionEnum[];
  label: string;
  onChange?: (option: InputSelectOptionEnum) => void;
  onMultiChange?: (options: InputSelectOptionEnum[]) => void;
  isMulti?: boolean;
  value?: InputSelectOptionEnum | InputSelectOptionEnum[];
  name?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  selectorClassName?: string;
}

const InputSelect: React.FunctionComponent<IInputSelectProps> = (
  props: IInputSelectProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const handleOnChange = (option: PropsValue<InputSelectOptionEnum>) => {
    if (props.onChange) {
      props.onChange(option as InputSelectOptionEnum);
    }
  };

  const handleOnMultiChange = (optionsParams: any) => {
    const options: InputSelectOptionEnum[] = optionsParams;

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
