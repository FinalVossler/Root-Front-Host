import React from "react";

import useStyles from "./banner.styles";
import { ITheme } from "roottypes";

interface IBannerProps {
  title?: string;
  description?: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
  theme: ITheme;
}
const Banner: React.FunctionComponent<IBannerProps> = (props: IBannerProps) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}></div>
      <div className={styles.bannerLayer}></div>
      {!props.hideTitle && (
        <h2 className={styles.bannerTitle}>{props.title ?? "CMS"}</h2>
      )}
      {!props.hideDescription && (
        <p className={styles.bannerDescription}>
          {props.description ??
            "E-Commerce, Social Network, Data Analysis, Dashboarding, Showcasing"}
        </p>
      )}
    </div>
  );
};

export default React.memo(Banner);
