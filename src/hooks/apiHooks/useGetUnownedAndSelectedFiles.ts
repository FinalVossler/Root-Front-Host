import { AxiosResponse } from "axios";
import React from "react";

import IFile from "../../globalTypes/IFile";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type FileGetUnownedAndSelectedFilesCommand = {
  paginationCommand: PaginationCommand;
  selectedFilesIds: string[];
};

const useGetUnownedAndSelectedFiles = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getUnownedAndSelectedFiles = (
    command: FileGetUnownedAndSelectedFilesCommand
  ) =>
    new Promise<{ files: IFile[]; total: number }>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<{ files: IFile[]; total: number }>>({
          method: "POST",
          data: command,
          url: "/files/getUnOwnedAndSelectedFiles",
        })
        .then((res) => {
          const files: IFile[] = res.data.data.files;
          const total: number = res.data.data.total;
          resolve({ files, total });
        })
        .finally(() => setLoading(false));
    });

  return { loading, getUnownedAndSelectedFiles };
};

export default useGetUnownedAndSelectedFiles;
