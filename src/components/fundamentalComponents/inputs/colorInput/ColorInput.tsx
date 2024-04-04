import React from "react";
import { AiOutlineBgColors } from "react-icons/ai";
import { SketchPicker, ColorChangeHandler, ColorResult } from "react-color";
import debounce from "lodash.debounce";
import { ITheme } from "roottypes";

import Input, { IInputProps } from "../input/Input";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

import useStyles from "./colorInput.styles";

export interface IColorInputProps extends IInputProps {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    colorResult?: ColorResult
  ) => any;
  theme: ITheme;
}

const ColorInput: React.FunctionComponent<IColorInputProps> = (
  props: IColorInputProps
) => {
  const [showPicker, setShowPicker] = React.useState(false);

  const styles = useStyles({ theme: props.theme });
  const pickerContainerRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(pickerContainerRef, () => setShowPicker(false));

  //#region Event listeners
  const handleTriggerShowPicker = () => setShowPicker(!showPicker);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleColorChange: ColorChangeHandler = (
    colorResult: ColorResult,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.onChange) {
      props.onChange(e, colorResult);
    }
  };
  const debouncedChange = debounce(handleColorChange, 500);
  //#endregion Event listeners

  return (
    <Input
      Icon={AiOutlineBgColors}
      onIconClick={handleTriggerShowPicker}
      iconColor={props.value || ""}
      {...props}
    >
      {showPicker && (
        <div
          ref={pickerContainerRef as React.RefObject<HTMLDivElement>}
          className={styles.pickerContainer}
        >
          <SketchPicker
            onChange={debouncedChange}
            color={props.value}
            className={styles.picker}
          />
        </div>
      )}
    </Input>
  );
};

export default React.memo(ColorInput);
