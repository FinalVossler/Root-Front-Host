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

  const styles = useStyles({ theme });
  const { getUserAndSelectedFiles, loading } = useGetUserAndSelectedFiles();
  const getTranslatedText = useGetTranslatedText();

  React.useEffect(() => {
    const getFiles = async () => {
      const paginationCommand: PaginationCommand = {
        page,
        limit: 20,
      };

      const command: FileGetUserAndSelectedFilesCommand = {
        paginationCommand,
        selectedFilesIds: props.selectedOwnFiles.map((f) => f._id || ""),
      };

      const filesResult: IFile[] = await getUserAndSelectedFiles(command);

      const concatenatedFiles = [...files, ...filesResult];
      // Remove redundancy (Because we could get in a future page a selected element that we already got)
      const newFiles = _.uniqWith(
        concatenatedFiles,
        (f1, f2) => f1._id === f2._id
      );

      setFiles(newFiles);
      setPage(page + 1);
    };

    getFiles();

    return () => {
      setFiles([]);
      setPage(1);
    };
  }, []);

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
  //#endregion Event listeners

  return (
    <div className={styles.ownFilesContainer}>
      {files.length === 0 && (
        <div className={styles.noFiles}>
          {getTranslatedText(staticText?.noFilesFound)}
        </div>
      )}

      {files.map((file, index) => {
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
            {!file.isImage && <AiOutlineFileDone className={styles.fileIcon} />}
            {!file.isImage && (
              <span className={styles.fileName}>{file.name}</span>
            )}
          </div>
        );
      })}

      {loading && <Loading />}
    </div>
  );
};

export default React.memo(OwnFiles);
