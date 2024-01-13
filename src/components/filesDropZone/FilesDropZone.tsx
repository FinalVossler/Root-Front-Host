import React from "react";
import Dropzone from "react-dropzone";
import { AiOutlineDropbox } from "react-icons/ai";

import { ITheme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./filesDropZone.styles";
import { toast } from "react-toastify";

interface IFilesDropZone {
  onDrop: (files: File[]) => any;
  disabled?: boolean;
}

const FilesDropZone: React.FunctionComponent<IFilesDropZone> = (
  props: IFilesDropZone
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.files
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleOnClickWhenDisabled = () => {
    toast.error(getTranslatedText(staticText?.readAccessOnlyErrorMessage));
  };

  return (
    <div {...(props.disabled ? { onClick: handleOnClickWhenDisabled } : {})}>
      <Dropzone onDrop={props.onDrop} disabled={props.disabled}>
        {({ getRootProps, getInputProps }) => (
          <div className={styles.filesDropZoneContainer} {...getRootProps()}>
            <input {...getInputProps()} />
            <AiOutlineDropbox className={styles.dropIcon} />
            <span className={styles.dropHereText}>
              {getTranslatedText(staticText?.dropHere)}
            </span>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FilesDropZone;
