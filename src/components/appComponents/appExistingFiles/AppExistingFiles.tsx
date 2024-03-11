import { IFileReadDto, ITheme } from "roottypes";

import useGetFiles from "../../../hooks/apiHooks/useGetFiles";
import ExistingFiles from "../../fundamentalComponents/existingFiles/ExistingFiles";
import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

export enum TypeOfFiles {
  UserFiles = "UserFiles",
  UnownedFiles = "UnownedFiles",
}

interface IAppExistingFiles {
  selectedExistingFiles: IFileReadDto[];
  setSelectedExistingFiles: (existingFiles: IFileReadDto[]) => void;
  typeOfFiles: TypeOfFiles;
  showOtherFiles?: boolean;
  disabled?: boolean;
}

const AppExistingFiles: React.FunctionComponent<IAppExistingFiles> = (
  props: IAppExistingFiles
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.files
  );

  const getTranslatedText = useGetTranslatedText();
  const { total, files, loading, page, setPage, limit } = useGetFiles({
    selectedExistingFiles: props.selectedExistingFiles,
    typeOfFiles: props.typeOfFiles,
  });

  return (
    <ExistingFiles
      selectedExistingFiles={props.selectedExistingFiles}
      setSelectedExistingFiles={props.setSelectedExistingFiles}
      typeOfFiles={props.typeOfFiles}
      disabled={props.disabled}
      showOtherFiles={props.showOtherFiles}
      total={total}
      files={files}
      loading={loading}
      page={page}
      setPage={setPage}
      limit={limit}
      theme={theme}
      text={{
        readAccessOnlyErrorMessage: getTranslatedText(
          staticText?.readAccessOnlyErrorMessage
        ),
        noFilesFound: getTranslatedText(staticText?.noFilesFound),
      }}
    />
  );
};

export default AppExistingFiles;
