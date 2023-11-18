import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./fullWidthPicture.styles";

interface IFullWidthPicture {
  pictureUrl: string;
}

const FullWidthPicture: React.FunctionComponent<IFullWidthPicture> = (
  props: IFullWidthPicture
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div
      className={styles.fullWidthPictureContainer}
      style={{ backgroundImage: "url(" + props.pictureUrl + ")" }}
    ></div>
  );
};

export default FullWidthPicture;
