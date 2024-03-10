import React from "react";
import { ColorResult } from "react-color";
import { FormikProps } from "formik";

import ColorInput, {
  IColorInputProps,
} from "../../inputs/colorInput/ColorInput";

interface IFormikColorInputProps extends IColorInputProps {
  formik: FormikProps<any>;
  name: string;
}

const FormikColorInput: React.FunctionComponent<IFormikColorInputProps> = (
  props: IFormikColorInputProps
) => {
  //#region Event listeners
  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    colorResult?: ColorResult
  ) => {
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, colorResult?.hex);
    }
    if (props.onChange) {
      props.onChange(e, colorResult);
    }
  };
  //#endregion Event listeners

  return (
    <ColorInput
      {...props}
      value={props.formik.values[props.name] ?? props.value}
      onChange={handleColorChange}
    />
  );
};

export default React.memo(FormikColorInput);
