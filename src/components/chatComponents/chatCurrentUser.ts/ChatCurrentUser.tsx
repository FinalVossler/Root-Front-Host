import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatSlice } from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./chatCurrentUser.styles";

interface IChatCurrentUser {}
const ChatContact: React.FunctionComponent<IChatCurrentUser> = (
  props: IChatCurrentUser
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();

  const handleCurrentUserClick = () => {
    dispatch(chatSlice.actions.setSelectedContactID(undefined));
  };

  return (
    <div
      onClick={handleCurrentUserClick}
      className={styles.chatCurrentUserContainer}
    >
      <img src="/logo512.png" className={styles.currentUserAvatar} />
      <span className={styles.currentUserName}>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default React.memo(ChatContact);
