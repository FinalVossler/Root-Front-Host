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
      {...(buttonDataCy ? { ["data-cy"]: buttonDataCy } : {})}
      {...rest}
      className={
        (rest.disabled
          ? styles.disabledButtonContainer
          : styles.buttonContainer) +
        (rest.className ? " " + rest.className : "")
      }
    >
      {rest.children}
    </button>
  );
};

export default Button;
