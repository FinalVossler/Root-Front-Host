import React from "react";
import _ from "lodash";
import {
  IFileGetUnownedAndSelectedFilesCommand,
  IFileGetUserAndSelectedFilesCommand,
  IFileReadDto,
  IPaginationCommand,
} from "roottypes";

import useGetUserAndSelectedFiles from "./useGetUserAndSelectedFiles";
import useGetUnownedAndSelectedFiles from "./useGetUnownedAndSelectedFiles";
import { TypeOfFiles } from "../../components/appComponents/appExistingFiles/AppExistingFiles";

interface IUseGetFiles {
  typeOfFiles: TypeOfFiles;
  selectedExistingFiles: IFileReadDto[];
}
const useGetFiles = (
  params: IUseGetFiles
): {
  total: number;
  files: IFileReadDto[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  loading: boolean;
} => {
  const [total, setTotal] = React.useState<number>(0);
  const [files, setFiles] = React.useState<IFileReadDto[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState(20);

  const { getUserAndSelectedFiles, loading: getUserAndSelectedFilesLoading } =
    useGetUserAndSelectedFiles();
  const {
    getUnownedAndSelectedFiles,
    loading: getUnownedAndSelectedFilesLoading,
  } = useGetUnownedAndSelectedFiles();

  React.useEffect(() => {
    return () => {
      setFiles([]);
      setPage(1);
    };
  }, []);

  const getFiles = async () => {
    const paginationCommand: IPaginationCommand = {
      page,
      limit,
    };

    let newFiles: IFileReadDto[] = [];
    let newTotal: number = 0;

    if (params.typeOfFiles === TypeOfFiles.UserFiles) {
      const command: IFileGetUserAndSelectedFilesCommand = {
        paginationCommand,
        selectedFilesIds: params.selectedExistingFiles.map((f) => f._id || ""),
      };

      const { files: filesResult, total } = await getUserAndSelectedFiles(
        command
      );

      newTotal = total;
      newFiles = filesResult;
    } else {
      const command: IFileGetUnownedAndSelectedFilesCommand = {
        paginationCommand,
        selectedFilesIds: params.selectedExistingFiles.map((f) => f._id || ""),
      };

      const { files: filesResult, total } = await getUnownedAndSelectedFiles(
        command
      );

      newTotal = total;
      newFiles = filesResult;
    }

    // Remove redundancy (Because we could get in a future page a selected element that we already got)
    const actualNewFiles = _.uniqWith(newFiles, (f1, f2) => f1._id === f2._id);

    setTotal(total);
    setFiles(actualNewFiles);
  };

  React.useEffect(() => {
    getFiles();
  }, [page]);

  return {
    total,
    files,
    page,
    setPage,
    limit,
    setLimit,
    loading:
      getUnownedAndSelectedFilesLoading || getUserAndSelectedFilesLoading,
  };
};

export default useGetFiles;
