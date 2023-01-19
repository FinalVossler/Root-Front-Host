import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./titleAndText.styles";

interface ITitleAndText {
  title: string;
  description: string;
}
const TitleAndText: React.FunctionComponent<ITitleAndText> = (
  props: ITitleAndText
) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });
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
