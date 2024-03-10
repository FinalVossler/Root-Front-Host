import { FormikProps } from "formik";
import React from "react";

import Textarea, { ITextareaProps } from "../../inputs/textarea/Textarea";

export interface IFormikTextareaProps extends ITextareaProps {
  formik: FormikProps<any>;
  name: string;
}

const FormikTextarea: React.FunctionComponent<
  React.PropsWithChildren<IFormikTextareaProps>
> = (props: React.PropsWithChildren<IFormikTextareaProps>) => {
  //#region Event listeners
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.formik.setFieldValue(props.name, e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  //#endregion Event listeners

  return (
    <Textarea
      {...props}
      onChange={handleChange}
      value={
        props.value !== undefined && props.value !== null
          ? props.value
          : props.formik.values[props.name]
      }
      error={
        props.formik.touched[props.name]
          ? props.formik.errors[props.name]?.toString()
          : props.error
      }
    />
  );
};

export default React.memo(FormikTextarea);
