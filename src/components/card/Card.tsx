import { useTheme } from "react-jss";
import { Theme } from "../../config/theme";

import useStyles from "./card.styles";

interface ICard {
  title: string;
  description: string;
  backgroundImage: string;
}
const Cared: React.FunctionComponent<ICard> = (props: ICard) => {
  const theme: Theme = useTheme();

  const styles = useStyles({ theme });
  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: "url(" + props.backgroundImage + ")" }}
      ></div>
      <div className={styles.cardLayer}></div>
      <h3 className={styles.cardTitle}>{props.title}</h3>
      <p className={styles.cardDescription}>{props.description}</p>
    </div>
  );
};

export default Cared;
