import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./chatCurrentUser.styles";

interface IChatCurrentUser {}
const ChatContact: React.FunctionComponent<IChatCurrentUser> = (
  props: IChatCurrentUser
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <div className={styles.chatCurrentUserContainer}>
      <img src="/logo512.png" className={styles.currentUserAvatar} />
      <span className={styles.currentUserName}>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default React.memo(ChatContact);
