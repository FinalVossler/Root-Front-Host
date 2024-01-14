import React from "react";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./spacing.styles";

interface ISpacingProps {
  height?: string;
}
const Spacing: React.FunctionComponent<ISpacingProps> = (
  props: ISpacingProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div
      style={{ marginBottom: props.height || "20px" }}
      className={styles.spacingContainer}
    ></div>
  );
};

export default React.memo(Spacing);
