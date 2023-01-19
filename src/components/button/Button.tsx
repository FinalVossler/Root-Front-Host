import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./button.styles";

interface IInput extends React.PropsWithChildren {
  onClick?: () => void;
}
const Input: React.FunctionComponent<IInput> = (props: IInput) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });

  return (
    <button className={styles.buttonContainer} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Input;
