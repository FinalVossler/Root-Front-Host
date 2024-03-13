import React from "react";
import { FormikProps } from "formik";
import { PropsValue } from "react-select";

import InputSelect, {
  IInputSelectProps,
  IInputSelectOption,
} from "../../inputs/inputSelect/InputSelect";

interface IFormikInputSelectProps extends IInputSelectProps {
  formik: FormikProps<any>;
  name: string;
}

const FormikInputSelect: React.FunctionComponent<IFormikInputSelectProps> = (
  props: IFormikInputSelectProps
) => {
  const handleOnChange = (option: PropsValue<IInputSelectOption>) => {
    props.formik.setFieldValue(
      props.name,
      (option as IInputSelectOption).value
    );

    if (props.onChange) {
      props.onChange(option as IInputSelectOption);
    }
  };

  const handleOnMultiChange = (optionsParams: any) => {
    const options: IInputSelectOption[] = optionsParams;
    props.formik.setFieldValue(
      props.name,
      options.map((option) => option.value)
    );
    if (props.onMultiChange) {
      props.onMultiChange(options);
    }
  };

  console.log("kdf");

  return (
    <InputSelect
      {...props}
      error={
        props.formik.touched[props.name]
          ? props.formik.errors[props.name]?.toString()
          : props.error
      }
      onChange={props.isMulti ? handleOnMultiChange : handleOnChange}
      onMultiChange={props.isMulti ? handleOnMultiChange : handleOnChange}
      value={
        props.isMulti
          ? props.options.filter((option) =>
              Boolean(
                props.formik?.values[props.name || ""].find(
                  (selectedOption: string) =>
                    selectedOption.toString() === option.value.toString()
                )
              )
            )
          : props.options.find(
              (option) =>
                option.value === props.formik?.values[props.name || ""]
            )
      }
    />
  );
};

export default React.memo(FormikInputSelect);
