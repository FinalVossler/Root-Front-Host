import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./titleAndText.styles";

interface ITitleAndText {
  title: string;
  description: string;
}
const TitleAndText: React.FunctionComponent<ITitleAndText> = (
  props: ITitleAndText
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

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
