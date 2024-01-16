import React from "react";

import { ITheme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./messageFilePreview.styles";
import { CgClose } from "react-icons/cg";
import getFileType, { FileTypeEnum } from "../../../../utils/getFileType";
import { IFileReadDto, IMessageReadDto } from "roottypes";

interface IMessageFilePreviewProps {
  file: IFileReadDto;
  message: IMessageReadDto;
  onClose: () => void;
}

const MessageFilePreview: React.FunctionComponent<IMessageFilePreviewProps> = (
  props: IMessageFilePreviewProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  const fileType = React.useMemo(() => getFileType(props.file), [props.file]);

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
        {!props.file.isImage && fileType !== FileTypeEnum.JSON && (
          <iframe
            className={styles.file}
            src={props.file.url}
            height={(window.innerHeight * 90) / 100}
            width={(window.innerWidth * 95) / 100}
          />
        )}
        {fileType === FileTypeEnum.JSON && (
          <iframe
            height={0}
            width={0}
            style={{ opacity: 0 }}
            src={props.file.url}
          ></iframe>
        )}
      </div>

      <CgClose className={styles.closeButton} onClick={props.onClose} />
    </div>
  );
};

export default MessageFilePreview;
