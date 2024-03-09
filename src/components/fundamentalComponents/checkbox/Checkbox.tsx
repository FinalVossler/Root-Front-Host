import React from "react";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./checkbox.styles";
import { ITheme } from "roottypes";

export interface ICheckboxProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  checked?: any;
  onChange?: (checked: boolean) => any;
  label?: string;
  labelStyles?: React.CSSProperties;
  inputDataCy?: string;
}
const Checkbox: React.FunctionComponent<ICheckboxProps> = (
  props: ICheckboxProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  //#region Event listeners
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.checked);
    }
  };
  //#endregion Event listeners

  return (
    <div className={styles.checkboxContainer}>
      {props.label && (
        <span style={{ ...(props.labelStyles || {}) }} className={styles.label}>
          {props.label}
        </span>
      )}
      <input
        type="checkbox"
        checked={props.checked}
        className={styles.input}
        name={props.name}
        onChange={handleChange}
        {...(props.inputDataCy ? { ["data-cy"]: props.inputDataCy } : {})}
        {...props.inputProps}
      />
    </div>
  );
};

export default React.memo(Checkbox);
