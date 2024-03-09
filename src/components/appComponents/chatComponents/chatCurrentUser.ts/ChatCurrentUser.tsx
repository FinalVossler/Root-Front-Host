import React from "react";
import { CgProfile } from "react-icons/cg";
import { IFileReadDto, ITheme, IUserReadDto } from "roottypes";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { chatSlice } from "../../../../store/slices/chatSlice";

import useStyles from "./chatCurrentUser.styles";

interface IChatCurrentUserProps {}
const ChatContact: React.FunctionComponent<IChatCurrentUserProps> = (
  props: IChatCurrentUserProps
) => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

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
      {(user.profilePicture as IFileReadDto)?.url && (
        <img
          src={(user.profilePicture as IFileReadDto)?.url}
          className={styles.currentUserAvatar}
        />
      )}

      {!(user.profilePicture as IFileReadDto)?.url && (
        <CgProfile className={styles.defaultAvatar} />
      )}

      <span className={styles.currentUserName}>
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default React.memo(ChatContact);
