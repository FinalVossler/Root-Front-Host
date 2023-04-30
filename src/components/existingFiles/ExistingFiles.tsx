import React from "react";
import Loading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";
import _ from "lodash";

import { Theme } from "../../config/theme";

import useStyles from "./existingFiles.styles";
import IFile from "../../globalTypes/IFile";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import { useAppSelector } from "../../store/hooks";
import useGetUserAndSelectedFiles, {
  FileGetUserAndSelectedFilesCommand,
} from "../../hooks/apiHooks/useGetUserAndSelectedFiles";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import Pagination from "../pagination";
import useGetUnownedFiles, {
  FileGetUnownedAndSelectedFilesCommand,
} from "../../hooks/apiHooks/useGetUnownedAndSelectedFiles";

export enum TypeOfFiles {
  UserFiles = "UserFiles",
  UnownedFiles = "UnownedFiles",
}

interface IExistingFiles {
  selectedExistingFiles: IFile[];
  setSelectedExistingFiles: (existingFiles: IFile[]) => void;
  typeOfFiles: TypeOfFiles;
  disabled?: boolean;
}

const ExistingFiles = (props: IExistingFiles) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.existingFiles
  );

  const [files, setFiles] = React.useState<IFile[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [total, setTotal] = React.useState<number>(0);

  const styles = useStyles({ theme });
  const { getUserAndSelectedFiles, loading: getUserAndSelectedFilesLoading } =
    useGetUserAndSelectedFiles();
  const { getUnownedAndSelectedFiles, loading: getUnownedFilesLoading } =
    useGetUnownedFiles();
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
      const paginationCommand: PaginationCommand = {
        page,
        limit,
      };

      let newFiles: IFile[] = [];
      let newTotal: number = 0;

      if (props.typeOfFiles === TypeOfFiles.UserFiles) {
        const command: FileGetUserAndSelectedFilesCommand = {
          paginationCommand,
          selectedFilesIds: props.selectedExistingFiles.map((f) => f._id || ""),
        };

        const { files: filesResult, total } = await getUserAndSelectedFiles(
          command
        );

        newTotal = total;
        newFiles = filesResult;
      } else {
        const command: FileGetUnownedAndSelectedFilesCommand = {
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
  const handleTriggerSelectFile = (file: IFile) => {
    if (props.disabled) return;

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
  //#endregion Event listeners

  const actualLoading =
    getUserAndSelectedFilesLoading || getUserAndSelectedFilesLoading;
  return (
    <div className={styles.existingFilesContainer}>
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

          return (
            <div
              onClick={() => handleTriggerSelectFile(file)}
              key={index}
              style={style}
              className={
                props.selectedExistingFiles.find((el) => el._id === file._id)
                  ? styles.selectedSingleFileContainer
                  : styles.singleFileContainer
              }
            >
              {!file.isImage && (
                <AiOutlineFileDone className={styles.fileIcon} />
              )}
              {!file.isImage && (
                <span className={styles.fileName}>{file.name}</span>
              )}
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
