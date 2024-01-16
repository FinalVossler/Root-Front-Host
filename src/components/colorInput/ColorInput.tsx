import React from "react";
import { AiOutlineBgColors } from "react-icons/ai";
import { SketchPicker, ColorChangeHandler, ColorResult } from "react-color";
import debounce from "lodash.debounce";

import { ITheme } from "../../config/theme";

import useStyles from "./colorInput.styles";
import { useAppSelector } from "../../store/hooks";
import Input, { IInputProps } from "../input/Input";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface IColorInputProps extends IInputProps {}

const ColorInput: React.FunctionComponent<IColorInputProps> = (
  props: IColorInputProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [showPicker, setShowPicker] = React.useState(false);

  const styles = useStyles({ theme });
  const pickerContainerRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(pickerContainerRef, () => setShowPicker(false));

  //#region Event listeners
  const handleTriggerShowPicker = () => setShowPicker(!showPicker);
  const handleColorChange: ColorChangeHandler = (
    colorResult: ColorResult,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.formik && props.name) {
      props.formik.setFieldValue(props.name, colorResult.hex);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };
  const debouncedChange = debounce(handleColorChange, 500);
  //#endregion Event listeners

  return (
    <Input
      Icon={AiOutlineBgColors}
      onIconClick={handleTriggerShowPicker}
      iconColor={
        props.formik && props.name ? props.formik.values[props.name] : ""
      }
      {...props}
    >
      {showPicker && (
        <div
          ref={pickerContainerRef as React.RefObject<HTMLDivElement>}
          className={styles.pickerContainer}
        >
          <SketchPicker
            onChange={debouncedChange}
            color={
              props.formik && props.name
                ? props.formik.values[props.name]
                : props.value
            }
            className={styles.picker}
          />
        </div>
      )}
    </Input>
  );
};

export default React.memo(ColorInput);
