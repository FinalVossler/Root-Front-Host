import React from "react";
import { useTheme } from "react-jss";
import Select from "react-select";
import { Props } from "react-select/dist/declarations/src/Select";

import { Theme } from "../../config/theme";

import useStyles from "./inputSelect.styles";

export type Option = {
  value: string;
  label: string;
};

interface IInputSelect {
  options: Option[];
  label: string;
  onChange: any;
  isMulti?: boolean;
  value: Option;
}

const InputSelect: React.FunctionComponent<IInputSelect> = (
  props: IInputSelect
) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });

  return (
    <div className={styles.inputSelectContainer}>
      <span className={styles.selectLabel}>{props.label}:</span>
      <Select
        isMulti={props.isMulti}
        onChange={props.onChange}
        options={props.options}
        value={props.value}
      />
    </div>
  );
};

export default React.memo(InputSelect);
