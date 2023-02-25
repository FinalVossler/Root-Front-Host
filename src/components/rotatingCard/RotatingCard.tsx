import { useTheme } from "react-jss";
import { Theme } from "../../config/theme";

import useStyles from "./rotatingCard.styles";

interface IRotatingCard {
  imageUrl?: string;
  title?: string;
  description?: string;
}
const RotatingCard: React.FunctionComponent<IRotatingCard> = (
  props: IRotatingCard
) => {
  const theme: Theme = useTheme();

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

      <p className={styles.description}>{props.description}</p>
    </div>
  );
};

export default RotatingCard;
