import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./titleTextAndImage.styles";

interface ITitleTextAndImageProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  theme: ITheme;
}

const TitleTextAndImage: React.FunctionComponent<ITitleTextAndImageProps> = (
  props: ITitleTextAndImageProps
) => {
  const styles = useStyles({ theme: props.theme });

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
            "url(" + (props.imageUrl ?? "/assets/images/hamza.jpeg") + ")",
        }}
      />
    </div>
  );
};

export default TitleTextAndImage;
