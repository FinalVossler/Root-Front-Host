import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";

import useStyles from "./banner.styles";

interface IBanner {
  title?: string;
  description?: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
}
const Banner: React.FunctionComponent<IBanner> = (props: IBanner) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}></div>
      <div className={styles.bannerLayer}></div>
      {!props.hideTitle && (
        <h2 className={styles.bannerTitle}>
          {props.title ?? "Socionic type assessment"}
        </h2>
      )}
      {!props.hideDescription && (
        <p className={styles.bannerDescription}>
          {props.description ??
            "Socionics. Online personality type test. The official socionics test of Viktor Gulenko"}
        </p>
      )}
    </div>
  );
};

export default React.memo(Banner);
