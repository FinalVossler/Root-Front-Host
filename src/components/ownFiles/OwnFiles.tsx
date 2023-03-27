import React from "react";
import Loading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";
import _ from "lodash";

import { Theme } from "../../config/theme";

import useStyles from "./ownFiles.styles";
import IFile from "../../globalTypes/IFile";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import { useAppSelector } from "../../store/hooks";
import useGetUserAndSelectedFiles, {
  FileGetUserAndSelectedFilesCommand,
} from "../../hooks/apiHooks/useGetUserAndSelectedFiles";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import Pagination from "../pagination";

interface IOwnFiles {
  selectedOwnFiles: IFile[];
  setSelectedOwnFiles: (ownFiles: IFile[]) => void;
}

const OwnFiles = (props: IOwnFiles) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.ownFiles
  );

  const [files, setFiles] = React.useState<IFile[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [total, setTotal] = React.useState<number>(0);

  const styles = useStyles({ theme });
  const { getUserAndSelectedFiles, loading } = useGetUserAndSelectedFiles();
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

      const command: FileGetUserAndSelectedFilesCommand = {
        paginationCommand,
        selectedFilesIds: props.selectedOwnFiles.map((f) => f._id || ""),
      };

      const { files: filesResult, total } = await getUserAndSelectedFiles(
        command
      );

      // Remove redundancy (Because we could get in a future page a selected element that we already got)
      const newFiles = _.uniqWith(filesResult, (f1, f2) => f1._id === f2._id);

      setTotal(total);
      setFiles(newFiles);
    };

    getFiles();
  }, [page]);
  //#endregion Effects

  //#region Event listeners
  const handleTriggerSelectFile = (file: IFile) => {
    let newOwnFiles = [...props.selectedOwnFiles];
    if (!newOwnFiles.find((el) => el._id === file._id)) {
      newOwnFiles.push(file);
    } else {
      newOwnFiles = newOwnFiles.filter((el) => el._id !== file._id);
    }
    props.setSelectedOwnFiles(newOwnFiles);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  //#endregion Event listeners

  return (
    <div className={styles.ownFilesContainer}>
      {files.length === 0 && !loading && (
        <div className={styles.noFiles}>
          {getTranslatedText(staticText?.noFilesFound)}
        </div>
      )}

      {!loading &&
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
                props.selectedOwnFiles.find((el) => el._id === file._id)
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
      <div className={styles.loadingContainer}>{loading && <Loading />}</div>

      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default React.memo(OwnFiles);
