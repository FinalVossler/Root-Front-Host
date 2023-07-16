import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./button.styles";

interface IButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {}

const Button: React.FunctionComponent<IButton> = (props: IButton) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <button
      className={
        props.disabled ? styles.disabledButtonContainer : styles.buttonContainer
      }
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
