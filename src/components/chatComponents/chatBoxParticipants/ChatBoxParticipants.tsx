import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Theme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chatSlice,
  Conversation,
  getConversationConversationalistsFromConversationId,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./ChatBoxParticipants.styles";

interface IChatBox {
  conversationId: string;
}

const ChatBox: React.FunctionComponent<IChatBox> = (props: IChatBox) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const contacts: IUser[] = useAppSelector((state) => state.chat.contacts);
  const conversation: Conversation | undefined = useAppSelector(
    (state) => state.chat.conversations
  ).find((c) => c.id === props.conversationId);
  const otherParticipants: IUser[] = React.useMemo(() => {
    if (conversation) {
      const participantsIds =
        getConversationConversationalistsFromConversationId(
          conversation.id
        ).filter((id) => id !== user._id);
      const result = contacts.filter(
        (c) => participantsIds.indexOf(c._id) !== -1
      );

      return result;
    } else return [];
  }, [contacts, conversation]);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();

  //#region Effects
  //#endregion Effects

  //#region Listeners
  const handleBackArrowClick = () => {
    dispatch(chatSlice.actions.setSelectedConversationId(undefined));
  };
  //#endregion Listeners

  return (
    <div className={styles.chatBoxParticipantsContainer}>
      <AiOutlineArrowLeft
        className={styles.backArrow}
        onClick={handleBackArrowClick}
      />
      {otherParticipants.map((participant: IUser) => {
        return (
          <div className={styles.participantContainer} key={participant._id}>
            {!participant.profilePicture?.url && (
              <CgProfile className={styles.avatar}></CgProfile>
            )}
            {participant.profilePicture?.url && (
              <img
                className={styles.avatar}
                src={participant.profilePicture.url}
              />
            )}
            <span className={styles.participantName}>
              {participant.firstName + " " + participant.lastName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ChatBox);
