import React from "react";
import Loading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";
import _ from "lodash";
import { toast } from "react-toastify";
import { BiDownload } from "react-icons/bi";
import { IFileReadDto, ITheme } from "roottypes";

import Pagination from "../pagination";
import { TypeOfFiles } from "../../appComponents/appExistingFiles/AppExistingFiles";

import useStyles from "./existingFiles.styles";

interface IExistingFilesProps {
  selectedExistingFiles: IFileReadDto[];
  setSelectedExistingFiles: (existingFiles: IFileReadDto[]) => void;
  typeOfFiles: TypeOfFiles;
  disabled?: boolean;
  showOtherFiles?: boolean;

  total: number;
  files: IFileReadDto[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  theme: ITheme;
  text: {
    readAccessOnlyErrorMessage: string;
    noFilesFound: string;
  };
}

const ExistingFiles: React.FunctionComponent<IExistingFilesProps> = (
  props: IExistingFilesProps
) => {
  const styles = useStyles({ theme: props.theme });

  //#region Event listeners
  const handleTriggerSelectFile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: IFileReadDto
  ) => {
    if (props.disabled) {
      return toast.error(props.text.readAccessOnlyErrorMessage);
    }

    let newExistingFiles = [...props.selectedExistingFiles];
    if (!newExistingFiles.find((el) => el._id === file._id)) {
      newExistingFiles.push(file);
    } else {
      newExistingFiles = newExistingFiles.filter((el) => el._id !== file._id);
    }
    props.setSelectedExistingFiles(newExistingFiles);
  };

  const handlePageChange = (page: number) => {
    props.setPage(props.page);
  };

  const handleDownloadFile = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  //#endregion Event listeners

  return (
    <div
      className={styles.existingFilesContainer}
      data-cy="existingFilesContainer"
    >
      {props.files.length === 0 && !props.loading && (
        <div className={styles.noFiles}>{props.text.noFilesFound}</div>
      )}

      {!props.loading &&
        props.files.map((file, index) => {
          const style: React.CSSProperties = {};
          if (file.isImage) {
            style.backgroundImage = "url(" + file.url + ")";
          }

          const isFileSelected: boolean = props.selectedExistingFiles.some(
            (el) => el._id === file._id
          );

          if (!isFileSelected && !props.showOtherFiles) {
            return null;
          }

          return (
            <div
              onClick={(e) => handleTriggerSelectFile(e, file)}
              key={index}
              style={style}
              className={
                isFileSelected
                  ? styles.selectedSingleFileContainer
                  : styles.singleFileContainer
              }
              data-cy={
                isFileSelected
                  ? "selectedExistingFileForFile" + file._id?.toString()
                  : "existingFileForFile" + file._id?.toString()
              }
            >
              {!file.isImage && (
                <AiOutlineFileDone className={styles.fileIcon} />
              )}
              {!file.isImage && (
                <span className={styles.fileName}>{file.name}</span>
              )}
              <a
                className={styles.downloadButton}
                href={file.url}
                download={file.name}
                onClick={handleDownloadFile}
                target="_blank"
                rel="noreferrer"
              >
                <BiDownload />
              </a>
            </div>
          );
        })}
      <div className={styles.loadingContainer}>
        {props.loading && <Loading />}
      </div>

      <Pagination
        page={props.page}
        limit={props.limit}
        total={props.total}
        onPageChange={handlePageChange}
        theme={props.theme}
      />
    </div>
  );
};

export default React.memo(ExistingFiles);
