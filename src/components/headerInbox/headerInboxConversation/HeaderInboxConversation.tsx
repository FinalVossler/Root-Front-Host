import React from "react";

import { Theme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  chatSlice,
  getConversationId,
  IPopulatedMessage,
} from "../../../store/slices/chatSlice";
import UserProfilePicture from "../../userProfilePicture";
import { SizeEnum } from "../../userProfilePicture/UserProfilePicture";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./headerInboxConversation.styles";
import { IoMdNotifications } from "react-icons/io";
import shortenString from "../../../utils/shortenString";

interface IHeaderInbox {
  message: IPopulatedMessage;
  otherUser: IUser;
  setInboxOpen: (inboxOpen: boolean) => void;
}

const HeaderInbox: React.FunctionComponent<IHeaderInbox> = (
  props: IHeaderInbox
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const totalUnreadMessages = useAppSelector(
    (state) => state.chat.conversations
  ).find(
    (c) =>
      c.id.toString() ===
      getConversationId(props.message.to.map((el) => el._id.toString()))
  )?.totalUnreadMessages;

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();

  const handleSelectConversationFromMessage = () => {
    const conversationId: string = getConversationId([
      ...props.message.to.map((u) => u._id),
    ]);
    dispatch(chatSlice.actions.addSelectedConversation({ conversationId }));
    props.setInboxOpen(false);
  };

  return (
    <div
      key={props.message._id}
      onClick={() => handleSelectConversationFromMessage()}
      className={styles.conversationContainer}
    >
      <UserProfilePicture
        url={props.otherUser.profilePicture?.url}
        size={SizeEnum.Small}
      />

      <div className={styles.userNameAndLastMessage}>
        <span className={styles.userName}>
          {props.otherUser.firstName + " " + props.otherUser.lastName}
        </span>
        <div
          className={styles.messageContent}
          dangerouslySetInnerHTML={{
            __html: shortenString(props.message.message, 100),
          }}
        ></div>
      </div>

      {Boolean(totalUnreadMessages) && (
        <div className={styles.notificationContainer}>
          <IoMdNotifications className={styles.notificationIcon} />

          <span className={styles.totalUnreadMessages}>
            {totalUnreadMessages}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(HeaderInbox);
