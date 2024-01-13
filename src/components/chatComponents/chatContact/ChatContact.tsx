import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiNotificationFill } from "react-icons/ri";

import { ITheme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chatSlice,
  getConversationConversationalistsFromConversationId,
  getConversationId,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./chatContact.styles";
import UserProfilePicture from "../../userProfilePicture";
import { SizeEnum } from "../../userProfilePicture/UserProfilePicture";
import useGetConversationTotalUnreadMessages from "../../../hooks/apiHooks/useGetConversationTotalUnreadMessages";

interface IChatContact {
  contact: IUser;
}

const ChatContact: React.FunctionComponent<IChatContact> = (
  props: IChatContact
) => {
  const userId: string = useAppSelector<string>((state) => state.user.user._id);
  const selectedConversationId: string | undefined = useAppSelector(
    (state) => state.chat.selectedConversationId
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const totalUnreadMessages = useAppSelector(
    (state) =>
      state.chat.conversations.find(
        (c) => c.id === getConversationId([props.contact._id, userId])
      )?.totalUnreadMessages
  );

  //#region Hooks
  const dispatch = useAppDispatch();
  const styles = useStyles({ theme });
  const { getConversationTotalUnreadMessages } =
    useGetConversationTotalUnreadMessages();
  //#endregion Hooks

  // Getting total unread messages of the conversation
  React.useEffect(() => {
    if (!userId) return;

    // If this isn't a selected contact, then we update the number of total unread messages from the database
    getConversationTotalUnreadMessages(
      getConversationId([userId, props.contact._id])
    );
  }, [userId]);

  const handleSelectContact = () => {
    dispatch(
      chatSlice.actions.setSelectedConversationId(
        getConversationId([userId, props.contact._id])
      )
    );
  };

  const isContactSelected: boolean = React.useMemo(() => {
    if (selectedConversationId) {
      const conversationalists: string[] =
        getConversationConversationalistsFromConversationId(
          selectedConversationId
        );

      return (
        conversationalists.length === 2 &&
        conversationalists.indexOf(props.contact._id) !== -1
      );
    }

    return false;
  }, [selectedConversationId]);

  return (
    <div
      onClick={handleSelectContact}
      className={
        isContactSelected
          ? styles.chatSelectedContactContainer
          : styles.chatContactContainer
      }
    >
      {totalUnreadMessages !== undefined && totalUnreadMessages > 0 && (
        <div className={styles.notificationContainer}>
          <RiNotificationFill className={styles.notificationIcon} />
          <span className={styles.notificationNumber}>
            {totalUnreadMessages}
          </span>
        </div>
      )}

      {props.contact.profilePicture?.url && (
        <UserProfilePicture
          url={props.contact.profilePicture?.url}
          size={SizeEnum.Small}
        />
      )}

      {!props.contact.profilePicture?.url && (
        <CgProfile className={styles.defaultAvatar} />
      )}

      <h2 className={styles.contactName}>
        {props.contact.firstName} {props.contact.lastName}
      </h2>
    </div>
  );
};

export default React.memo(ChatContact);
