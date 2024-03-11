import React from "react";

import useStyles from "./animatedTitle.styles";
import { ITheme } from "roottypes";

interface IAnimatedTitleProps {
  title: string;
  theme: ITheme;
}
const AnimatedTitle: React.FunctionComponent<IAnimatedTitleProps> = (
  props: IAnimatedTitleProps
) => {
  const styles = useStyles({ theme: props.theme });

  const words = props.title.split(" ");

  return (
    <div className={styles.animatedTitleContainer}>
      {words.map((word, wordIndex) => {
        return (
          <div
            key={wordIndex}
            className={styles.wordContainer}
            style={{ marginLeft: wordIndex * 100 }}
          >
            {word.split("").map((letter, letterIndex) => (
              <div key={letterIndex} className={styles.letterContainer}>
                <span className={styles.mainLetter}>{letter}</span>
                <span className={styles.subLetter}>{letter}</span>
              </div>
            ))}
          </div>
        );
      })}

      <div className={styles.trait1}></div>
      <div className={styles.trait2}></div>
    </div>
  );
};

export default React.memo(AnimatedTitle);
