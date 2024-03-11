import React from "react";
import { IFileReadDto, ITheme } from "roottypes";

import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";

import useStyles from "./writePostButton.styles";

interface IWritePostButtonProps {
  onClick?: any;
  theme: ITheme;
  text: {
    haveSomethingInMind: string;
  };
  profilePicture: IFileReadDto | undefined;
}

const WritePostButton: React.FunctionComponent<IWritePostButtonProps> = (
  props: IWritePostButtonProps
) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.writePostButtonContainer}>
      <UserProfilePicture
        theme={props.theme}
        url={props.profilePicture?.url}
        size={SizeEnum.Big}
      />

      <div
        onClick={props.onClick}
        className={styles.placeholder}
        data-cy="writePostButton"
      >
        {props.text.haveSomethingInMind}
      </div>
    </div>
  );
};

export default React.memo(WritePostButton);
