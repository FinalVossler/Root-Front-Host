import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./titleAndText.styles";

interface ITitleAndTextProps {
  title: string;
  description: string;
  theme: ITheme;
}
const TitleAndText: React.FunctionComponent<ITitleAndTextProps> = (
  props: ITitleAndTextProps
) => {
  const styles = useStyles({ theme: props.theme });
  return (
    <div className={styles.titleAndTextContainer}>
      <h2 className={styles.title}>{props.title}</h2>

      <div className={styles.decorationContainer}>
        <div className={styles.decorationLine}></div>
        <span className={styles.decorationIcon}>♦</span>
        <div className={styles.decorationLine}></div>
      </div>

      <p className={styles.text}>{props.description}</p>
    </div>
  );
};

export default TitleAndText;
