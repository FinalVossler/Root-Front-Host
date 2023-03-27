import React from "react";
import { CgProfile } from "react-icons/cg";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import Button from "../button";
import { Theme } from "../../config/theme";

import useStyles from "./profilePictureUpload.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { IUser, userSlice } from "../../store/slices/userSlice";
import IFile from "../../globalTypes/IFile";
import uploadFile from "../../utils/uploadFile";
import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";
import readAsBase64 from "../../utils/readAsBase64";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

interface IProfilePictureUpload {}
const ImageUpload: React.FunctionComponent<IProfilePictureUpload> = (
  props: IProfilePictureUpload
) => {
  const profilePicture: IFile | undefined = useAppSelector<IFile | undefined>(
    (state) => state.user.user.profilePicture
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );

  const [file, setFile] = React.useState<File | null>(null);
  const [fileAsBase64, setFileAsBase64] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const inputRef = React.useRef<HTMLInputElement>();
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();

  const styles = useStyles({ theme });

  const handleTriggerInput = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (file === null) return toast.error("Upload a new picture first");

    setLoading(true);

    const newProfilePicture: IFile | undefined = await uploadFile(file);

    if (newProfilePicture) {
      axios
        .request<AxiosResponse<IUser>>({
          method: "PUT",
          url: "/users/updateProfilePicture",
          data: newProfilePicture,
        })
        .then((res) => {
          const newUser: IUser = res.data.data;
          dispatch(userSlice.actions.setUser(newUser));
        })
        .finally(() => {
          setLoading(false);
          setFile(null);
          setFileAsBase64(null);
        });
    } else {
      setLoading(false);
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

      const base64: string = await readAsBase64(file);
      setFileAsBase64(base64);
    }
  };

  return (
    <div className={styles.profilePictureUploadContainer}>
      {(profilePicture?.url || fileAsBase64) && !loading && (
        <>
          <UserProfilePicture
            url={fileAsBase64 ? fileAsBase64 : profilePicture?.url}
            size={SizeEnum.VeryBig}
            onClick={handlePictureClick}
          />
          <br />
        </>
      )}
      {!profilePicture?.url && !fileAsBase64 && !loading && (
        <CgProfile
          onClick={handleTriggerInput}
          className={styles.defaultIcon}
        />
      )}
      {loading && (
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
      <Button disabled={loading} onClick={handleUpload}>
        {getTranslatedText(staticText?.upload)}
      </Button>
    </div>
  );
};

export default React.memo(ImageUpload);
