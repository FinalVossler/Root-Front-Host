import React from "react";
import Loading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";
import _ from "lodash";
import { BiDownload } from "react-icons/bi";

import { ITheme } from "../../../config/theme";

import { useAppSelector } from "../../../store/hooks";
import useGetUserAndSelectedFiles from "../../../hooks/apiHooks/useGetUserAndSelectedFiles";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import Pagination from "../../fundamentalComponents/pagination";
import useGetUnownedFiles from "../../../hooks/apiHooks/useGetUnownedAndSelectedFiles";

import useStyles from "./existingFiles.styles";
import { toast } from "react-toastify";
import {
  IFileGetUnownedAndSelectedFilesCommand,
  IFileGetUserAndSelectedFilesCommand,
  IFileReadDto,
  IPaginationCommand,
} from "roottypes";

export enum TypeOfFiles {
  UserFiles = "UserFiles",
  UnownedFiles = "UnownedFiles",
}

interface IExistingFilesProps {
  selectedExistingFiles: IFileReadDto[];
  setSelectedExistingFiles: (existingFiles: IFileReadDto[]) => void;
  typeOfFiles: TypeOfFiles;
  disabled?: boolean;
  showOtherFiles?: boolean;
}

const ExistingFiles: React.FunctionComponent<IExistingFilesProps> = (
  props: IExistingFilesProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.files
  );

  const [files, setFiles] = React.useState<IFileReadDto[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [total, setTotal] = React.useState<number>(0);

  const styles = useStyles({ theme });
  const { getUserAndSelectedFiles, loading: getUserAndSelectedFilesLoading } =
    useGetUserAndSelectedFiles();
  const {
    getUnownedAndSelectedFiles,
    loading: getUnownedAndSelectedFilesLoading,
  } = useGetUnownedFiles();
  const getTranslatedText = useGetTranslatedText();

  //#region Effects
  React.useEffect(() => {
    return () => {
      setFiles([]);
      setPage(1);
    };
  }, []);

  React.useEffect(() => {
    const getFiles = async () => {
      const paginationCommand: IPaginationCommand = {
        page,
        limit,
      };

      let newFiles: IFileReadDto[] = [];
      let newTotal: number = 0;

      if (props.typeOfFiles === TypeOfFiles.UserFiles) {
        const command: IFileGetUserAndSelectedFilesCommand = {
          paginationCommand,
          selectedFilesIds: props.selectedExistingFiles.map((f) => f._id || ""),
        };

        const { files: filesResult, total } = await getUserAndSelectedFiles(
          command
        );

        newTotal = total;
        newFiles = filesResult;
      } else {
        const command: IFileGetUnownedAndSelectedFilesCommand = {
          paginationCommand,
          selectedFilesIds: props.selectedExistingFiles.map((f) => f._id || ""),
        };

        const { files: filesResult, total } = await getUnownedAndSelectedFiles(
          command
        );

        newTotal = total;
        newFiles = filesResult;
      }

      // Remove redundancy (Because we could get in a future page a selected element that we already got)
      const actualNewFiles = _.uniqWith(
        newFiles,
        (f1, f2) => f1._id === f2._id
      );

      setTotal(total);
      setFiles(actualNewFiles);
    };

    getFiles();
  }, [page]);
  //#endregion Effects

  //#region Event listeners
  const handleTriggerSelectFile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: IFileReadDto
  ) => {
    if (props.disabled) {
      return toast.error(
        getTranslatedText(staticText?.readAccessOnlyErrorMessage)
      );
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
    setPage(page);
  };

  const handleDownloadFile = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  //#endregion Event listeners

  const actualLoading =
    getUserAndSelectedFilesLoading || getUserAndSelectedFilesLoading;
  return (
    <div
      className={styles.existingFilesContainer}
      data-cy="existingFilesContainer"
    >
      {files.length === 0 && !actualLoading && (
        <div className={styles.noFiles}>
          {getTranslatedText(staticText?.noFilesFound)}
        </div>
      )}

      {!actualLoading &&
        files.map((file, index) => {
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
        {actualLoading && <Loading />}
      </div>

      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default React.memo(ExistingFiles);
