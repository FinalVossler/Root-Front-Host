import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./fullWidthPicture.styles";

interface IFullWidthPicture {
  pictureUrl: string;
}

const FullWidthPicture: React.FunctionComponent<IFullWidthPicture> = (
  props: IFullWidthPicture
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div className={styles.fullWidthPictureContainer}>
      <img src={props.pictureUrl} className={styles.fullWidthPicture} />
    </div>
  );
};

export default FullWidthPicture;
