import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./spacing.styles";

interface ISpacing {
  height?: string;
}
const Spacing: React.FunctionComponent<ISpacing> = (props: ISpacing) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });
  return (
    <div
      style={{ height: props.height || "20px" }}
      className={styles.spacingContainer}
    ></div>
  );
};

export default React.memo(Spacing);
