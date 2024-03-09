import { ITheme } from "roottypes";
import { useAppSelector } from "../../../store/hooks";
import shortenString from "../../../utils/shortenString";

import useStyles from "./card2.styles";

interface ICard2Props {
  title: string;
  description: string;
  backgroundImage?: string;
}
const Card2: React.FunctionComponent<ICard2Props> = (props: ICard2Props) => {
  const theme: ITheme = useAppSelector(
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
