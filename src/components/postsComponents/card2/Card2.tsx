import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import shortenString from "../../../utils/shortenString";

import useStyles from "./card2.styles";

interface ICard2 {
  title: string;
  description: string;
  backgroundImage?: string;
}
const Card2: React.FunctionComponent<ICard2> = (props: ICard2) => {
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
      <h3 className={styles.cardTitle}>{props.title}</h3>
      <p className={styles.cardDescription}>
        {shortenString(props.description, 200)}
      </p>
    </div>
  );
};

export default Card2;
