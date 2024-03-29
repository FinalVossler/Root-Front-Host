import React from "react";
import { CgProfile } from "react-icons/cg";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

import Button from "../../fundamentalComponents/button";

import useStyles from "./profilePictureUpload.styles";
import { useAppSelector } from "../../../store/hooks";
import uploadFile from "../../../utils/uploadFile";
import UserProfilePicture from "../../fundamentalComponents/userProfilePicture";
import { SizeEnum } from "../../fundamentalComponents/userProfilePicture/UserProfilePicture";
import readAsBase64 from "../../../utils/readAsBase64";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useUpdateProfilePicture from "../../../hooks/apiHooks/useUpdateProfilePicture";
import FilesInput from "../filesInput";
import { IFileReadDto, ITheme } from "roottypes";
import { TypeOfFiles } from "../appExistingFiles/AppExistingFiles";

interface IProfilePictureUploadProps {}
const ImageUpload: React.FunctionComponent<IProfilePictureUploadProps> = (
  props: IProfilePictureUploadProps
) => {
  const profilePicture: IFileReadDto | undefined = useAppSelector<
    IFileReadDto | undefined
  >((state) => state.user.user.profilePicture as IFileReadDto);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );

  const [file, setFile] = React.useState<File | null>(null);
  const [selectedOwnFile, setSelectedOwnFile] =
    React.useState<IFileReadDto | null>(null);
  const [fileAsBase64, setFileAsBase64] = React.useState<string | null>(null);
  const [uploadingFileLoading, setUploadingFileLoading] =
    React.useState<boolean>(false);

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const inputRef = React.useRef<HTMLInputElement>();
  const getTranslatedText = useGetTranslatedText();
  const { updateProfilePicture, loading } = useUpdateProfilePicture();

  const styles = useStyles({ theme });

  const handleTriggerInput = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (file === null && selectedOwnFile === null)
      return toast.error(getTranslatedText(staticText?.uploadANewPictureFirst));

    let newProfilePicture: IFileReadDto | undefined;

    if (file) {
      setUploadingFileLoading(true);
      newProfilePicture = await uploadFile(file);
      setUploadingFileLoading(false);
    }
    if (selectedOwnFile) {
      newProfilePicture = selectedOwnFile;
    }

    if (newProfilePicture) {
      await updateProfilePicture(newProfilePicture);

      setFile(null);
      setSelectedOwnFile(null);
      setFileAsBase64(null);
    }
  };

  const handlePictureClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files?.length > 0) {
      const file: File = event.target.files[0];
      setFile(file);
      setSelectedOwnFile(null);

      const base64: string = await readAsBase64(file);
      setFileAsBase64(base64);
    }
  };

  const actualLoading = loading || uploadingFileLoading;

  return (
    <div className={styles.profilePictureUploadContainer}>
      {(profilePicture?.url || fileAsBase64) && !loading && (
        <>
          <UserProfilePicture
            theme={theme}
            url={
              fileAsBase64
                ? fileAsBase64
                : selectedOwnFile
                ? selectedOwnFile.url
                : profilePicture?.url
            }
            size={SizeEnum.VeryBig}
            onClick={handlePictureClick}
          />
          <br />
        </>
      )}
      {!profilePicture?.url && !fileAsBase64 && !actualLoading && (
        <CgProfile
          onClick={handleTriggerInput}
          className={styles.defaultIcon}
        />
      )}
      {actualLoading && (
        <ReactLoading
          className={styles.loading}
          type={"spin"}
          color={theme.primary}
          width={150}
          height={150}
        />
      )}

      <input
        hidden
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="file"
        onChange={handleFileChange}
      />

      <Button theme={theme} disabled={actualLoading} onClick={handleUpload}>
        {getTranslatedText(staticText?.update)}
      </Button>

      <FilesInput
        selectedExistingFiles={selectedOwnFile ? [selectedOwnFile] : []}
        setSelectedExistingFiles={(existingFiles: IFileReadDto[]) => {
          if (existingFiles.length > 0) {
            setFile(null);
            setFileAsBase64(null);
            setSelectedOwnFile(existingFiles[existingFiles.length - 1]);
          }
        }}
        files={[]}
        setFiles={() => undefined}
        allowMany={false}
        label={getTranslatedText(staticText?.chooseFromYourExistingFiles)}
        canAddNew={false}
        typeOfFiles={TypeOfFiles.UserFiles}
      />
    </div>
  );
};

export default React.memo(ImageUpload);
