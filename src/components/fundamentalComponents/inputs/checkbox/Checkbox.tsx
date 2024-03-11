import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./checkbox.styles";

export interface ICheckboxProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  checked?: any;
  onChange?: (checked: boolean) => any;
  label?: string;
  labelStyles?: React.CSSProperties;
  inputDataCy?: string;
  theme: ITheme;
}
const Checkbox: React.FunctionComponent<ICheckboxProps> = (
  props: ICheckboxProps
) => {
  const styles = useStyles({ theme: props.theme });

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
