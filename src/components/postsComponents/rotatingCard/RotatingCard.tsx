import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import shortenString from "../../../utils/shortenString";

import useStyles from "./rotatingCard.styles";

interface IRotatingCardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}
const RotatingCard: React.FunctionComponent<IRotatingCardProps> = (
  props: IRotatingCardProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  return (
    <div className={styles.rotatingContainer}>
      <div
        className={styles.iconContainer}
        style={{
          backgroundImage:
            "url(" + (props.imageUrl || "/assets/images/card1.jpeg") + ")",
        }}
      ></div>

      <span className={styles.title}>{props.title || "Data"}</span>

      <div className={styles.trait}></div>

      <p className={styles.description}>
        {shortenString(props.description || "", 170)}
      </p>
    </div>
  );
};

export default RotatingCard;
