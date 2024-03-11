import { ITheme } from "roottypes";

import useStyles from "./fullWidthPicture.styles";

interface IFullWidthPictureProps {
  pictureUrl: string;
  theme: ITheme;
}

const FullWidthPicture: React.FunctionComponent<IFullWidthPictureProps> = (
  props: IFullWidthPictureProps
) => {
  const styles = useStyles({ theme: props.theme });
  return (
    <div className={styles.fullWidthPictureContainer}>
      <img src={props.pictureUrl} className={styles.fullWidthPicture} />
    </div>
  );
};

export default FullWidthPicture;
