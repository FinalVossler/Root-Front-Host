import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./titleTextAndImage.styles";

interface ITitleTextAndImage {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const TitleTextAndImage: React.FunctionComponent<ITitleTextAndImage> = (
  props: ITitleTextAndImage
) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });

  return (
    <div className={styles.TitleTextAndImageContainer}>
      <div className={styles.left}>
        <span className={styles.title}>{props.title}</span>
        <p className={styles.description}>{props.description}</p>
      </div>

      <div
        className={styles.image}
        style={{
          backgroundImage:
            "url(" + (props.imageUrl ?? "/assets/images/nozha.jpeg") + ")",
        }}
      />
    </div>
  );
};

export default TitleTextAndImage;
