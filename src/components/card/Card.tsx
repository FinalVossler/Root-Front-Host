import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./card.styles";

interface ICard {
  title: string;
  description: string;
  backgroundImage: string;
}
const Card: React.FunctionComponent<ICard> = (props: ICard) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

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

export default Card;
