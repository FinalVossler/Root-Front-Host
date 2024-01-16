import { AxiosResponse } from "axios";
import React from "react";

import useAuthorizedAxios from "../useAuthorizedAxios";
import {
  IFileGetUnownedAndSelectedFilesCommand,
  IFileReadDto,
} from "roottypes";

const useGetUnownedAndSelectedFiles = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getUnownedAndSelectedFiles = (
    command: IFileGetUnownedAndSelectedFilesCommand
  ) =>
    new Promise<{ files: IFileReadDto[]; total: number }>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<{ files: IFileReadDto[]; total: number }>>({
          method: "POST",
          data: command,
          url: "/files/getUnOwnedAndSelectedFiles",
        })
        .then((res) => {
          const files: IFileReadDto[] = res.data.data.files;
          const total: number = res.data.data.total;
          resolve({ files, total });
        })
        .finally(() => setLoading(false));
    });

  return { loading, getUnownedAndSelectedFiles };
};

export default useGetUnownedAndSelectedFiles;
