import React from "react";
import { ITheme } from "roottypes";
import { GiIsland } from "react-icons/gi";

import useStyles from "./nothingToShow.styles";

interface INothingToShowProps {
  theme: ITheme;
}

const NothingToShow: React.FunctionComponent<
  React.PropsWithChildren<INothingToShowProps>
> = (props: INothingToShowProps) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.nothingToShowContainer}>
      <GiIsland
        className={styles.nothingToShowLogo}
        color={props.theme.darkTextColor}
      />
    </div>
  );
};

export default NothingToShow;
