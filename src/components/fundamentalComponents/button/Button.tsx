import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./button.styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonDataCy?: string;
  theme: ITheme;
}

const Button: React.FunctionComponent<
  React.PropsWithChildren<IButtonProps>
> = ({ buttonDataCy, ...rest }: React.PropsWithChildren<IButtonProps>) => {
  const styles = useStyles({ theme: rest.theme });

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
