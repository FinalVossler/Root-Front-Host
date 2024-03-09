import React from "react";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./underlinedTitle.styles";
import { ITheme } from "roottypes";

interface IUnderlinedTitleProps {
  title: string;
}
const UnderlinedTitle: React.FunctionComponent<IUnderlinedTitleProps> = (
  props: IUnderlinedTitleProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  return (
    <div className={styles.underlinedTitleContainer}>
      <h2 className={styles.title}>{props.title}</h2>
    </div>
  );
};

export default React.memo(UnderlinedTitle);
