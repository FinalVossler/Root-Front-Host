import React from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import YouTube from "react-youtube";

import Modal from "../../modal";

import useStyles from "./video.styles";
import { ITheme } from "roottypes";

interface IVideoProps {
  title?: string;
  videoId?: string;
  theme: ITheme;
}

const Video: React.FunctionComponent<IVideoProps> = (props: IVideoProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const styles = useStyles({ theme: props.theme });

  //#region Event listeners
  const handleCloseVideo = () => setIsOpen(false);
  const handleOpenVideo = () => setIsOpen(true);
  //#endregion Event listeners

  return (
    <div onClick={handleOpenVideo} className={styles.videoContainer}>
      <div className={styles.videoIconContainer}>
        <div className={styles.animatedVideoIconContainer}></div>
        <MdSlowMotionVideo
          color={props.theme.primary}
          className={styles.videoIcon}
        />
      </div>
      <span className={styles.videoTitle}>{props.title}</span>

      <Modal theme={props.theme} handleClose={handleCloseVideo} open={isOpen}>
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
