import React from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import YouTube from "react-youtube";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import Modal from "../../fundamentalComponents/modal";

import useStyles from "./video.styles";

interface IVideoProps {
  title?: string;
  videoId?: string;
}

const Video: React.FunctionComponent<IVideoProps> = (props: IVideoProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const styles = useStyles({ theme });

  //#region Event listeners
  const handleCloseVideo = () => setIsOpen(false);
  const handleOpenVideo = () => setIsOpen(true);
  //#endregion Event listeners

  return (
    <div onClick={handleOpenVideo} className={styles.videoContainer}>
      <div className={styles.videoIconContainer}>
        <div className={styles.animatedVideoIconContainer}></div>
        <MdSlowMotionVideo color={theme.primary} className={styles.videoIcon} />
      </div>
      <span className={styles.videoTitle}>{props.title}</span>

      <Modal handleClose={handleCloseVideo} open={isOpen}>
        <div className={styles.modalContent}>
          <span className={styles.modalTitle}>{props.title}</span>
          <YouTube
            className={styles.video}
            videoId={props.videoId || "g0jiB6xHHLk"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Video;
