import { FormikProps } from "formik";
import React from "react";

import Checkbox, { ICheckboxProps } from "../checkbox/Checkbox";

interface IFormikCheckboxProps extends ICheckboxProps {
  formik: FormikProps<any>;
  name: string;
}
const FormikCheckbox: React.FunctionComponent<IFormikCheckboxProps> = (
  props: IFormikCheckboxProps
) => {
  //#region Event listeners
  const handleChange = (checked: boolean) => {
    if (props.onChange) {
      props.onChange(checked);
    }
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, checked);
    }
  };
  //#endregion Event listeners

  return (
    <Checkbox
      {...props}
      onChange={handleChange}
      checked={props.name ? props.formik.values[props.name] : props.checked}
    />
  );
};

export default React.memo(FormikCheckbox);
