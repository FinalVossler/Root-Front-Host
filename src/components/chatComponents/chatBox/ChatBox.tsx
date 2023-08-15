import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import { Theme } from "../../../config/theme";
import useLoadMessages, {
  MessageGetBetweenUsersCommand,
} from "../../../hooks/apiHooks/useLoadMessages";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chatSlice,
  Conversation,
  getConversationConversationalistsFromConversationId,
  IMessage,
  IPopulatedMessage,
  populatedMessageToMessage,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";
import Button from "../../button";
import ChatBoxParticipants from "../chatBoxParticipants/ChatBoxParticipants";
import ChatInput from "../chatInput";
import Message from "../message/Message";

import useStyles from "./chatBox.styles";
import useMarkAllConversationsMessagesAsReadByUser, {
  MessageMarkMessagesAsReadByUserCommand,
} from "../../../hooks/apiHooks/useMarkAllConversationMessagesAsReadByUser";
import UserProfilePicture from "../../userProfilePicture";
import { SizeEnum } from "../../userProfilePicture/UserProfilePicture";
import { BsThreeDots } from "react-icons/bs";
import useGetUsersWithTheirLastReadMessageInConversation from "../../../hooks/apiHooks/useGetUsersWithTheirLastReadMessageInConversation";

export enum BoxType {
  SmallBox = "SmallBox",
  FullPageBox = "FullPageBox",
}

interface IChatBox {
  conversationId: string;
  boxType: BoxType;
}

let lastMessageId: string | null = null;
const ChatBox: React.FunctionComponent<IChatBox> = (props: IChatBox) => {
  //#region Store
  const user: IUser = useAppSelector((state) => state.user.user);
  const conversation: Conversation | undefined = useAppSelector(
    (state) => state.chat.conversations
  ).find((el) => el.id === props.conversationId);
  const messages: IMessage[] =
    useAppSelector(
      (state) =>
        state.chat.conversations.find((el) => el.id === props.conversationId)
          ?.messages
    ) || [];
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const unreadMessagesIds: string[] | undefined = useAppSelector(
    (state) => state.chat.conversations
  )
    .find((conv) => conv.id === props.conversationId)
    ?.messages.filter((conv) => conv.read.indexOf(user._id) === -1)
    .map((conv) => conv._id);
  //#endregion Store

  //#region State
  const [limit, setLimit] = React.useState<number>(9);
  const [total, setTotal] = React.useState(0);
  // We keep track of the last message in the list to know when to force scrolling down
  const [previousConversationId, setPreviousConversationId] =
    React.useState<string>();
  const [page, setPage] = React.useState<number>(
    Math.floor(messages.length / limit) + 1
  );
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const scrollToDiv = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { loadMessages, loading: loadingMessages } = useLoadMessages();
  const { markAllConversationMessagesAsReadByUser } =
    useMarkAllConversationsMessagesAsReadByUser();
  const { getUsersWithTheirLastReadMessageInConversation } =
    useGetUsersWithTheirLastReadMessageInConversation();
  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    setPage(Math.floor(messages.length / limit) + 1);
  }, [messages.length]);

  React.useEffect(() => {
    handleLoadMessages(1);
  }, [props.conversationId]);

  React.useEffect(() => {
    lastMessageId = null;
  }, [props.conversationId]);

  React.useEffect(() => {
    // Scroll to the bottom when we just loaded the component
    scrollToDiv.current?.scrollIntoView();
  }, [scrollToDiv.current]);

  React.useEffect(() => {
    // Scroll to the bottom when we just loaded the messages, when a new message is received
    // and when the conversation changes.
    if (
      messages.length > 0 &&
      (lastMessageId === null ||
        // Last message isn't the same as the previous one
        lastMessageId !== messages[messages.length - 1]._id)
    ) {
      scrollToDiv.current?.scrollIntoView();
    }
    if (messages.length > 0) {
      lastMessageId = messages[messages.length - 1]._id;
    }

    if (props.conversationId !== previousConversationId) {
      scrollToDiv.current?.scrollIntoView();
      setPreviousConversationId(props.conversationId);
    }
  }, [props.conversationId, messages, scrollToDiv.current]);

  // Get the concerned users with their lastly read message because we need their profile pictures for the "read messages" signals
  React.useEffect(() => {
    getUsersWithTheirLastReadMessageInConversation(
      getConversationConversationalistsFromConversationId(props.conversationId)
    );
  }, [props.conversationId]);
  //#endregion Effects

  //#region Listeners
  const handleLoadMessages = async (whichPage: number) => {
    const command: MessageGetBetweenUsersCommand = {
      usersIds: getConversationConversationalistsFromConversationId(
        props.conversationId
      ),
      paginationCommand: {
        page: whichPage,
        limit,
      },
    };

    const total: number = await loadMessages(command);

    setTotal(total);
    setLimit(limit);
  };

  const handleAddMessage = React.useCallback(
    (populatedMessage: IPopulatedMessage) => {
      dispatch(
        chatSlice.actions.addMessages({
          messages: [populatedMessageToMessage(populatedMessage)],
          currentUser: user,
          populatedMessages: [populatedMessage],
        })
      );
    },

    [messages, dispatch]
  );

  const handleLoadMore = () => {
    if (total > messages.length) {
      handleLoadMessages(page);
    }
  };

  const handleCloseSmallBox = () => {
    dispatch(
      chatSlice.actions.unselectConversation({
        conversationId: props.conversationId,
      })
    );
  };

  // Mark all unread messages as read when the chat messages box is clicked
  const handleMarkAllConversationMessagesAsRead = () => {
    if (unreadMessagesIds && unreadMessagesIds.length > 0) {
      const command: MessageMarkMessagesAsReadByUserCommand = {
        to: getConversationConversationalistsFromConversationId(
          props.conversationId
        ),
      };
      markAllConversationMessagesAsReadByUser(
        command,
        props.conversationId,
        user._id
      );
    }
  };
  //#endregion Listeners
  return (
    <div
      className={
        props.boxType === BoxType.SmallBox
          ? typeof unreadMessagesIds?.length === "number" &&
            unreadMessagesIds?.length > 0
            ? styles.highlightedSmallBox
            : styles.smallBoxContainer
          : styles.chatBoxContainer
      }
    >
      {props.boxType === BoxType.SmallBox && (
        <AiFillCloseCircle
          onClick={handleCloseSmallBox}
          className={styles.closeButton}
        />
      )}

      <ChatBoxParticipants
        boxType={props.boxType}
        conversationId={props.conversationId}
      />

      <div
        onClick={handleMarkAllConversationMessagesAsRead}
        className={styles.chatMessagesBox}
      >
        {total > messages.length && !loadingMessages && (
          <div className={styles.loadMoreButtonContainer}>
            <Button className={styles.loadMoreButton} onClick={handleLoadMore}>
              ...
            </Button>
          </div>
        )}

        {messages.map((message) => {
          return (
            <Message
              message={message}
              key={message._id}
              conversation={conversation}
            />
          );
        })}

        {conversation?.typingUsers?.map((u) => (
          <div key={u._id.toString()} className={styles.typingUserContainer}>
            <UserProfilePicture
              size={SizeEnum.Small}
              url={u.profilePicture?.url}
            />
            <div className={styles.typingUserIndicator}>
              <BsThreeDots color={theme.lightTextColor} />
            </div>
          </div>
        ))}

        <div ref={scrollToDiv}></div>
      </div>
      <ChatInput
        conversationId={props.conversationId}
        handleAddMessage={handleAddMessage}
        handleMarkAllConversationMessagesAsRead={
          handleMarkAllConversationMessagesAsRead
        }
      />
    </div>
  );
};

export default React.memo(ChatBox);
