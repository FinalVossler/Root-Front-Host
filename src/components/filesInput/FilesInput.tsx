import React from "react";
import {
  AiFillFileAdd,
  AiOutlineFileDone,
  AiFillCloseCircle,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import IFile from "../../globalTypes/IFile";
import { useAppSelector } from "../../store/hooks";
import isFileAnImage from "../../utils/isFileAnImage";
import readAsBase64 from "../../utils/readAsBase64";
import ExistingFiles from "../existingFiles";
import { TypeOfFiles } from "../existingFiles/ExistingFiles";

import useStyles from "./filesInput.styles";

// Used to show the new selected images
type TrackedImage = {
  base64: string;
  // Used to track the index in the original array (the post's files array)
  indexInParent: number;
};

// Used to show the new selected files
type TrackedFile = {
  file: File;
  indexInParent: number;
};

interface IFilesInput {
  setFiles: (files: File[]) => void;
  files: File[];
  selectedExistingFiles: IFile[];
  setSelectedExistingFiles: (existingFiles: IFile[]) => void;
  allowMany?: boolean;
  label?: string;
  disabled?: boolean;
  canAddNew?: boolean;
  typeOfFiles: TypeOfFiles;
}

const FilesInput = (props: IFilesInput) => {
  const allowMany = props.allowMany ?? true;
  const canAddNew = props.canAddNew ?? true;

  console.log("props.selectedExisting", props.selectedExistingFiles);

  const [images, setTrackedImages] = React.useState<TrackedImage[]>([]);
  const [trackedFiles, setTrackedFiles] = React.useState<TrackedFile[]>([]);
  const [existingFilesOpen, setSelectedExistingFilesOpen] =
    React.useState<boolean>(true);
  const [isShowing, setIsShowing] = React.useState<boolean>(false);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!allowMany && props.selectedExistingFiles.length > 0) {
      setTrackedFiles([]);
      setTrackedImages([]);
    }
  }, [props.selectedExistingFiles]);

  React.useEffect(() => {
    if (props.files.length === 0) {
      setTrackedFiles([]);
      setTrackedImages([]);
    }
  }, [props.selectedExistingFiles]);

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
        if (isFileAnImage(file)) {
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

  const handleTriggerExistingFilesOpen = () => {
    setSelectedExistingFilesOpen(!existingFilesOpen);
  };

  const handleTriggerIsShowing = () => setIsShowing(!isShowing);
  //#endregion Event listeners

  return (
    <div className={styles.filesInputContainer}>
      {props.label && (
        <span
          onClick={handleTriggerIsShowing}
          className={styles.fileInputLabel}
        >
          {props.label}{" "}
          {isShowing ? (
            <BsArrowDownShort className={styles.isShowingIcon} />
          ) : (
            <BsArrowUpShort className={styles.isShowingIcon} />
          )}
        </span>
      )}
      {isShowing && (
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
                  <span className={styles.fileName}>
                    {trackedFile.file.name}
                  </span>
                  <AiFillCloseCircle
                    onClick={() => handleRemoveFile(trackedFile)}
                    className={styles.removeIcon}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isShowing && (
        <div className={styles.buttonsContainer}>
          {canAddNew && (
            <AiOutlineFileSearch
              className={styles.chooseFilesButton}
              onClick={handleTriggerExistingFilesOpen}
              color={theme.primary}
            />
          )}

          <AiFillFileAdd onClick={handleIconClick} className={styles.icon} />

          <input
            onChange={handleFileChange}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            hidden
            type="file"
            multiple={allowMany}
          />
        </div>
      )}
      {existingFilesOpen && isShowing && (
        <ExistingFiles
          selectedExistingFiles={props.selectedExistingFiles}
          setSelectedExistingFiles={props.setSelectedExistingFiles}
          typeOfFiles={props.typeOfFiles}
        />
      )}
      {props.disabled && (
        <div className={styles.filesInputDisabledLayer}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default React.memo(FilesInput);
