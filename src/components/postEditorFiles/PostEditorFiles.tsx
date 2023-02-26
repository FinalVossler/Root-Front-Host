import React from "react";
import { useTheme } from "react-jss";
import {
  AiFillFileAdd,
  AiOutlineFileDone,
  AiFillCloseCircle,
  AiOutlineFileSearch,
} from "react-icons/ai";

import { Theme } from "../../config/theme";

import useStyles from "./postEditorFiles.styles";
import readAsBase64 from "../../utils/readAsBase64";
import OwnFiles from "../ownFiles";
import IFile from "../../globalTypes/IFile";

type TrackedImage = {
  base64: string;
  // Used to track the index in the original array (the post's files array)
  indexInParent: number;
};

type TrackedFile = {
  file: File;
  indexInParent: number;
};

interface IPostEditorFiles {
  setFiles: (files: File[]) => void;
  files: File[];
  ownFiles: IFile[];
  setOwnFiles: (ownFiles: IFile[]) => void;
}

const PostEditor = (props: IPostEditorFiles) => {
  const [images, setTrackedImages] = React.useState<TrackedImage[]>([]);
  const [trackedFiles, setTrackedFiles] = React.useState<TrackedFile[]>([]);
  const [ownFilesOpen, setOwnFilesOpen] = React.useState<boolean>(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);

  //#region Event listeners
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      props.setFiles(newFiles);

      const newTrackedImages: TrackedImage[] = [];
      const newTrackedFiles: TrackedFile[] = [];

      for (let i = 0; i < newFiles.length; i++) {
        const file: File = newFiles[i];
        if (
          ["image/png", "image/gif", "image/jpeg"].indexOf(file.type) !== -1
        ) {
          const base64: string = await readAsBase64(newFiles[i]);
          newTrackedImages.push({ base64, indexInParent: i });
        } else {
          newTrackedFiles.push({ file, indexInParent: i });
        }
      }

      setTrackedImages(newTrackedImages);
      setTrackedFiles(newTrackedFiles);
    } else {
      props.setFiles([]);
    }
  };

  const handleRemoveFile = (trackedElement: TrackedImage | TrackedFile) => {
    const newFiles: File[] = [...props.files];

    newFiles.splice(trackedElement.indexInParent, 1);

    props.setFiles(newFiles);

    if ((trackedElement as TrackedImage).base64) {
      const newTrackedImages = images.filter(
        (image) => image.base64 !== (trackedElement as TrackedImage).base64
      );
      setTrackedImages(newTrackedImages);
    } else {
      const newTrackedFiles = trackedFiles.filter(
        (file) =>
          file.file.stream !== (trackedElement as TrackedFile).file.stream
      );
      setTrackedFiles(newTrackedFiles);
    }
  };

  const handleTriggerOwnFilesOpen = () => {
    if (ownFilesOpen) {
      props.setOwnFiles([]);
    }
    setOwnFilesOpen(!ownFilesOpen);
  };
  //#endregion Event listeners

  return (
    <div className={styles.postEditorFilesContainer}>
      <div className={styles.filesContainer}>
        <div className={styles.imagesContainer}>
          {images.map((trackedImage: TrackedImage, i) => {
            return (
              <div key={i} className={styles.singleFileContainer}>
                <img
                  className={styles.singleImage}
                  style={{
                    backgroundImage: "url(" + trackedImage.base64 + ")",
                  }}
                />
                <AiFillCloseCircle
                  onClick={() => handleRemoveFile(trackedImage)}
                  className={styles.removeIcon}
                />
              </div>
            );
          })}
          {trackedFiles.map((trackedFile: TrackedFile, i: number) => {
            return (
              <div key={i} className={styles.singleFileContainer}>
                <AiOutlineFileDone className={styles.fileIcon} />
                <span className={styles.fileName}>{trackedFile.file.name}</span>
                <AiFillCloseCircle
                  onClick={() => handleRemoveFile(trackedFile)}
                  className={styles.removeIcon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <AiOutlineFileSearch
          className={styles.chooseFilesButton}
          onClick={handleTriggerOwnFilesOpen}
          color={theme.primary}
        />

        <AiFillFileAdd onClick={handleIconClick} className={styles.icon} />

        <input
          onChange={handleFileChange}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          hidden
          type="file"
          multiple
        />
      </div>
      {ownFilesOpen && (
        <OwnFiles ownFiles={props.ownFiles} setOwnFiles={props.setOwnFiles} />
      )}
    </div>
  );
};

export default React.memo(PostEditor);
