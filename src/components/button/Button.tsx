import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./button.styles";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<React.PropsWithChildren<IButton>> = (
  props: React.PropsWithChildren<IButton>
) => {
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
