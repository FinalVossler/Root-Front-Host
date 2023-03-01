import { FormikProps } from "formik";
import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./checkbox.styles";

interface ICheckbox {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  name?: string;
  formik?: FormikProps<any>;
  checked?: any;
  onChange?: (checked: boolean) => any;
  label?: string;
}
const Checkbox: React.FunctionComponent<ICheckbox> = (props: ICheckbox) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  //#region Event listeners
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e.target.checked);
    }
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, e.target.checked);
    }
  };

  //#endregion Event listeners

  return (
    <div className={styles.checkboxContainer}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <input
        type="checkbox"
        checked={
          props.formik && props.name
            ? props.formik.values[props.name]
            : props.checked
        }
        className={styles.input}
        name={props.name}
        onChange={handleChange}
        {...props.inputProps}
      />
    </div>
  );
};

export default React.memo(Checkbox);
