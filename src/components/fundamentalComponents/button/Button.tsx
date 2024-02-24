import React from "react";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./button.styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonDataCy?: string;
}

const Button: React.FunctionComponent<
  React.PropsWithChildren<IButtonProps>
> = ({ buttonDataCy, ...rest }: React.PropsWithChildren<IButtonProps>) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <button
      className={
        rest.disabled ? styles.disabledButtonContainer : styles.buttonContainer
      }
      {...(buttonDataCy ? { ["data-cy"]: buttonDataCy } : {})}
      {...rest}
    >
      {rest.children}
    </button>
  );
};

export default Button;
