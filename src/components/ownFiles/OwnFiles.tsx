import React from "react";
import Loading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";

import { Theme } from "../../config/theme";

import useStyles from "./ownFiles.styles";
import IFile from "../../globalTypes/IFile";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../../store/hooks";

interface IOwnFiles {
  selectedOwnFiles: IFile[];
  setSelectedOwnFiles: (ownFiles: IFile[]) => void;
}

const OwnFiles = (props: IOwnFiles) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<IFile[]>([]);
  const [page, setPage] = React.useState(1);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();

  React.useEffect(() => {
    const paginationCommand: PaginationCommand = {
      page,
      limit: 20,
    };

    setLoading(true);

    axios
      .request<AxiosResponse<IFile[]>>({
        method: "POST",
        data: paginationCommand,
        url: "/files/getUserFiles",
      })
      .then((res) => {
        setFiles([...files, ...res.data.data]);
        setPage(page + 1);
      })
      .finally(() => setLoading(false));

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
        <div className={styles.noFiles}>No Files found</div>
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
