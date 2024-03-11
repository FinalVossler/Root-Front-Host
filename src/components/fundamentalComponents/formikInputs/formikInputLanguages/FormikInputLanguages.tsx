import { FormikProps } from "formik";
import React from "react";
import { ITheme } from "roottypes";

import InputLanguages from "../../inputs/inputLanguages";

interface IFormikInputLanguages {
  formik: FormikProps<any>;
  name: string;
  theme: ITheme;
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
      theme={props.theme}
    />
  );
};

export default FormikInputLanguages;
