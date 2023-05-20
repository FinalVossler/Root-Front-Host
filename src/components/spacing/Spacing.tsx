import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./spacing.styles";

interface ISpacing {
  height?: string;
}
const Spacing: React.FunctionComponent<ISpacing> = (props: ISpacing) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  console.log("props height", props.height);
  const styles = useStyles({ theme });
  return (
    <div
      style={{ marginBottom: props.height || "20px" }}
      className={styles.spacingContainer}
    ></div>
  );
};

export default React.memo(Spacing);
