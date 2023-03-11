import React from "react";

import { useAppSelector } from "../../store/hooks";
import IFile from "../../globalTypes/IFile";
import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";

import useStyles from "./writePostButton.styles";
import { Theme } from "../../config/theme";

interface IButton {
  onClick?: any;
}

const WritePostButton = (props: IButton) => {
  const profilePicture: IFile | undefined = useAppSelector(
    (state) => state.user.user.profilePicture
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.writePostButtonContainer}>
      <UserProfilePicture url={profilePicture?.url} size={SizeEnum.Big} />

      <div onClick={props.onClick} className={styles.placeholder}>
        Have something in mind?
      </div>
    </div>
  );
};

export default React.memo(WritePostButton);
