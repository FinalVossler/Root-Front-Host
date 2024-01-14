import React from "react";

import { useAppSelector } from "../../store/hooks";
import IFile from "../../globalTypes/IFile";
import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";

import useStyles from "./writePostButton.styles";
import { ITheme } from "../../config/theme";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

interface IWritePostButtonProps {
  onClick?: any;
}

const WritePostButton: React.FunctionComponent<IWritePostButtonProps> = (
  props: IWritePostButtonProps
) => {
  const profilePicture: IFile | undefined = useAppSelector(
    (state) => state.user.user.profilePicture
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.posts
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  return (
    <div className={styles.writePostButtonContainer}>
      <UserProfilePicture url={profilePicture?.url} size={SizeEnum.Big} />

      <div onClick={props.onClick} className={styles.placeholder}>
        {getTranslatedText(staticText?.haveSomethingInMind)}
      </div>
    </div>
  );
};

export default React.memo(WritePostButton);
