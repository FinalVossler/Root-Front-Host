import { FormikProps } from "formik";
import React, { PropsWithChildren } from "react";

import Input, { IInputProps } from "../../inputs/input/Input";

export interface IFormikInputProps extends IInputProps {
  formik: FormikProps<any>;
  name: string;
}

const FormikInput: React.FunctionComponent<
  PropsWithChildren<IFormikInputProps>
> = (props: PropsWithChildren<IFormikInputProps>) => {
  //#region Event listeners
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.onChange) {
      props.formik.setFieldValue(props.name, e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };
  //#endregion Event listeners

  return (
    <Input
      {...props}
      theme={props.theme}
      value={props.formik.values[props.name]}
      onChange={handleChange}
      error={
        props.formik.touched[props.name]
          ? props.formik.errors[props.name]?.toString()
          : props.error
      }
    />
  );
};

export default React.memo(FormikInput);
