import { FormikProps } from "formik";
import React from "react";
import InputLanguages from "../../inputs/inputLanguages";

interface IFormikInputLanguages {
  formik: FormikProps<any>;
  name: string;
}

const FormikInputLanguages: React.FunctionComponent<IFormikInputLanguages> = (
  props: IFormikInputLanguages
) => {
  const handleChange = (languages) => {
    props.formik.setFieldValue(props.name, languages);
  };

  return (
    <InputLanguages
      value={props.formik.values[props.name]}
      onChange={handleChange}
    />
  );
};

export default FormikInputLanguages;
