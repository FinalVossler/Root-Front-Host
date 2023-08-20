import React from "react";

import { Theme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import IFile from "../../../../globalTypes/IFile";

import useStyles from "./messageFilePreview.styles";
import { IMessage } from "../../../../store/slices/chatSlice";
import { CgClose } from "react-icons/cg";

interface IMessageFilePreview {
  file: IFile;
  message: IMessage;
  onClose: () => void;
}

const MessageFilePreview: React.FunctionComponent<IMessageFilePreview> = (
  props: IMessageFilePreview
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.messageFilePreviewContainer}>
      <div
        id={"file " + props.file.uuid}
        key={props.file._id}
        className={styles.mainFileContainer}
        onClick={props.onClose}
      >
        {props.file.isImage && (
          <img
            className={styles.file}
            src={props.file.url}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {!props.file.isImage && (
          <iframe
            className={styles.file}
            src={props.file.url}
            height={(window.innerHeight * 90) / 100}
            width={(window.innerWidth * 95) / 100}
          />
        )}
      </div>

      <CgClose className={styles.closeButton} onClick={props.onClose} />
    </div>
  );
};

export default MessageFilePreview;
