import { AxiosResponse } from "axios";
import React from "react";
import IFile from "../../globalTypes/IFile";
import PaginationCommand from "../../globalTypes/PaginationCommand";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type FileGetUserAndSelectedFilesCommand = {
  paginationCommand: PaginationCommand;
  selectedFilesIds: string[];
};

const useGetUserAndSelectedFiles = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getUserAndSelectedFiles = (
    command: FileGetUserAndSelectedFilesCommand
  ) =>
    new Promise<IFile[]>((resolve, reject) => {
      axios
        .request<AxiosResponse<IFile[]>>({
          method: "POST",
          data: command,
          url: "/files/getUserAndSelectedFilesCommand",
        })
        .then((res) => {
          const files: IFile[] = res.data.data;
          resolve(files);
        })
        .finally(() => setLoading(false));
    });

  return { loading, getUserAndSelectedFiles };
};

export default useGetUserAndSelectedFiles;
