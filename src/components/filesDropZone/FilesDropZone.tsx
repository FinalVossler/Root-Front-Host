import React from "react";
import Dropzone from "react-dropzone";
import { AiOutlineDropbox } from "react-icons/ai";

import { Theme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./filesDropZone.styles";

interface IFilesDropZone {
  onDrop: (files: File[]) => any;
}

const FilesDropZone: React.FunctionComponent<IFilesDropZone> = (
  props: IFilesDropZone
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.files
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  return (
    <Dropzone onDrop={props.onDrop}>
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
  );
};

export default FilesDropZone;
