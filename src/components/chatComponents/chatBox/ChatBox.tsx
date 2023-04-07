import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import { Theme } from "../../../config/theme";
import useLoadMessages, {
  MessageGetBetweenUsersCommand,
} from "../../../hooks/apiHooks/useLoadMessages";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chatSlice,
  getConversationConversationalistsFromConversationId,
  IMessage,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";
import Button from "../../button";
import ChatBoxParticipants from "../chatBoxParticipants/ChatBoxParticipants";
import ChatInput from "../chatInput";
import Message from "../message/Message";

import useStyles from "./chatBox.styles";

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
  const messages: IMessage[] =
    useAppSelector(
      (state) =>
        state.chat.conversations.find((el) => el.id === props.conversationId)
          ?.messages
    ) || [];
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  //#endregion Store

  //#region State
  const [limit, setLimit] = React.useState<number>(9);
  const [total, setTotal] = React.useState(0);
  // We keep track of the last message in the list to know when to force scrolling down
  const [previousConversationId, setPreviousConversationId] =
    React.useState<string>();
  const [page, setPage] = React.useState<number>(1);
  //#endregion State

  //#region Hooks
  const styles = useStyles({ theme });
  const scrollToDiv = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { loadMessages, loading: loadingMessages } = useLoadMessages();
  //#endregion Hooks

  //#region Effects
  React.useEffect(() => {
    setPage(1);
    handleLoadMessages(1);
  }, [props.conversationId]);

  React.useEffect(() => {
    lastMessageId = null;
  }, [props.conversationId]);

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
  }, [props.conversationId, messages]);
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
    setPage(whichPage + 1);
  };

  const handleAddMessage = React.useCallback(
    (message: IMessage) => {
      dispatch(
        chatSlice.actions.addMessages({
          messages: [message],
          currentUser: user,
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
  //#endregion Listeners

  return (
    <div
      className={
        props.boxType === BoxType.SmallBox
          ? styles.smallBoxContainer
          : props.conversationId
          ? styles.chatBoxContainer
          : styles.noConversationSelectedChatBoxContainer
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

      <div className={styles.chatMessagesBox}>
        {total > messages.length && !loadingMessages && (
          <div className={styles.loadMoreButtonContainer}>
            <Button className={styles.loadMoreButton} onClick={handleLoadMore}>
              ...
            </Button>
          </div>
        )}

        {messages.map((message, index) => {
          return (
            <React.Fragment key={index}>
              <Message message={message} key={message._id} />
            </React.Fragment>
          );
        })}
        <div ref={scrollToDiv}></div>
      </div>
      <ChatInput
        conversationId={props.conversationId}
        handleAddMessage={handleAddMessage}
      />
    </div>
  );
};

export default React.memo(ChatBox);
