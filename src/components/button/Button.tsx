import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./button.styles";

interface IButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {}

const Button: React.FunctionComponent<IButton> = (props: IButton) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });

  return (
    <button className={styles.buttonContainer} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
