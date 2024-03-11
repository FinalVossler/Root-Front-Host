import React from "react";

import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./spacing.styles";
import { ITheme } from "roottypes";

interface ISpacingProps {
  height?: string;
  theme: ITheme;
}
const Spacing: React.FunctionComponent<ISpacingProps> = (
  props: ISpacingProps
) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div
      style={{ marginBottom: props.height || "20px" }}
      className={styles.spacingContainer}
    ></div>
  );
};

export default React.memo(Spacing);
