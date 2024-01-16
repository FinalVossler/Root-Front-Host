import React from "react";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import { getConversationId } from "../../../store/slices/chatSlice";
import UserProfilePicture from "../../userProfilePicture";
import { SizeEnum } from "../../userProfilePicture/UserProfilePicture";

import useStyles from "./inboxConversation.styles";
import { IoMdNotifications } from "react-icons/io";
import shortenString from "../../../utils/shortenString";
import {
  IFileReadDto,
  IPopulatedMessageReadDto,
  IUserReadDto,
} from "roottypes";

interface IInboxConversationProps {
  message: IPopulatedMessageReadDto;
  // Other user is optional because it could be that the other user was deleted from the DB (Problem noticed when Mahmoud deleted Yasmine)
  otherUser?: IUserReadDto;
  onSelectConversation: (conversationId: string) => void;
}

const InboxConversation: React.FunctionComponent<IInboxConversationProps> = (
  props: IInboxConversationProps
) => {
  const theme: ITheme = useAppSelector(
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

  const handleSelectConversationFromMessage = () => {
    const conversationId: string = getConversationId([
      ...props.message.to.map((u) => u._id),
    ]);
    props.onSelectConversation(conversationId);
  };

  return (
    <div
      key={props.message._id}
      onClick={() => handleSelectConversationFromMessage()}
      className={styles.conversationContainer}
    >
      <UserProfilePicture
        url={(props.otherUser?.profilePicture as IFileReadDto)?.url}
        size={SizeEnum.Small}
      />

      <div className={styles.userNameAndLastMessage}>
        <span className={styles.userName}>
          {(props.otherUser?.firstName || "🤷") +
            " " +
            (props.otherUser?.lastName || "🤷")}
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

export default React.memo(InboxConversation);
