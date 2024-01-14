import React from "react";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./titleTextAndImage.styles";

interface ITitleTextAndImageProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const TitleTextAndImage: React.FunctionComponent<ITitleTextAndImageProps> = (
  props: ITitleTextAndImageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

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
            "url(" + (props.imageUrl ?? "/assets/images/hamza.jpeg") + ")",
        }}
      />
    </div>
  );
};

export default TitleTextAndImage;
