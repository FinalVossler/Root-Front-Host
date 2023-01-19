import { useTheme } from "react-jss";
import { Theme } from "../../config/theme";

import useStyles from "./banner.styles";

interface IBanner {}
const Banner: React.FunctionComponent<IBanner> = (props: IBanner) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}></div>
      <div className={styles.bannerLayer}></div>
      <h2 className={styles.bannerTitle}>Socionic type assessment</h2>
      <p className={styles.bannerDescription}>
        Socionics. Online personality type test. The official socionics test of
        Viktor Gulenko.
      </p>
    </div>
  );
};

export default Banner;
