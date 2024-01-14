import React from "react";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./banner.styles";

interface IBannerProps {
  title?: string;
  description?: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
}
const Banner: React.FunctionComponent<IBannerProps> = (props: IBannerProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
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
