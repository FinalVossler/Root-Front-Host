import React from "react";
import { CgProfile } from "react-icons/cg";

import { ITheme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatSlice } from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./chatCurrentUser.styles";

interface IChatCurrentUserProps {}
const ChatContact: React.FunctionComponent<IChatCurrentUserProps> = (
  props: IChatCurrentUserProps
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();

  const handleCurrentUserClick = () => {
    dispatch(chatSlice.actions.setSelectedConversationId(undefined));
  };

  return (
    <div
      onClick={handleCurrentUserClick}
      className={styles.chatCurrentUserContainer}
    >
      {user.profilePicture?.url && (
        <img
          src={user.profilePicture?.url}
          className={styles.currentUserAvatar}
        />
      )}

      {!user.profilePicture?.url && (
        <CgProfile className={styles.defaultAvatar} />
      )}

      <span className={styles.currentUserName}>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default React.memo(ChatContact);
