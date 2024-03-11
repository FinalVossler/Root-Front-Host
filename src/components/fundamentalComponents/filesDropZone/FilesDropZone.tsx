import React from "react";
import Dropzone from "react-dropzone";
import { AiOutlineDropbox } from "react-icons/ai";
import { ITheme } from "roottypes";
import { toast } from "react-toastify";

import useStyles from "./filesDropZone.styles";

interface IFilesDropZoneProps {
  onDrop: (files: File[]) => any;
  disabled?: boolean;
  theme: ITheme;
  text: {
    readAccessOnlyErrorMessage: string;
    dropHere: string;
  };
}

const FilesDropZone: React.FunctionComponent<IFilesDropZoneProps> = (
  props: IFilesDropZoneProps
) => {
  const styles = useStyles({ theme: props.theme });

  const handleOnClickWhenDisabled = () => {
    toast.error(props.text.readAccessOnlyErrorMessage);
  };

  return (
    <div {...(props.disabled ? { onClick: handleOnClickWhenDisabled } : {})}>
      <Dropzone onDrop={props.onDrop} disabled={props.disabled}>
        {({ getRootProps, getInputProps }) => (
          <div className={styles.filesDropZoneContainer} {...getRootProps()}>
            <input {...getInputProps()} />
            <AiOutlineDropbox className={styles.dropIcon} />
            <span className={styles.dropHereText}>{props.text.dropHere}</span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FilesDropZone;
