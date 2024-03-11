import React from "react";
import { ITheme } from "roottypes";

import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./underlinedTitle.styles";

interface IUnderlinedTitleProps {
  title: string;
  theme: ITheme;
}
const UnderlinedTitle: React.FunctionComponent<IUnderlinedTitleProps> = (
  props: IUnderlinedTitleProps
) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.underlinedTitleContainer}>
      <h2 className={styles.title}>{props.title}</h2>
    </div>
  );
};

export default React.memo(UnderlinedTitle);
