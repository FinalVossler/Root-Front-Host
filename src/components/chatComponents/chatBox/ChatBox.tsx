import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import PaginationResponse from "../../../globalTypes/PaginationResponse";
import SuccessResponseDto from "../../../globalTypes/SuccessResponseDto";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatSlice, IMessage } from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";
import Button from "../../button";
import ChatInput from "../chatInput";
import Message from "../message/Message";

import useStyles from "./chatBox.styles";

interface IChatBox {
  conversationalists: string[];
}

const ChatBox: React.FunctionComponent<IChatBox> = (props: IChatBox) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const messages =
    useAppSelector(
      (state) =>
        state.chat.conversations.find(
          (el) => el.id === props.conversationalists.sort().join()
        )?.messages
    ) || [];

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(20);
  const [total, setTotal] = React.useState(0);
  // We keep track of the last message in the list to know when to force scrolling down
  const [lastMessage, setLastMessage] = React.useState<IMessage | null>(null);
  const [previousConversationlists, setPreviousConversationalists] =
    React.useState<string[]>();

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const scrollToDiv = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Getting messages
  React.useEffect(() => {
    handleLoadMessages({ fetchingNew: true, page: 1 });
  }, [props.conversationalists]);

  // Only scroll to the bottom when the conversationalists change, and when we have fetched the messages
  React.useEffect(() => {
    if (
      previousConversationlists !== props.conversationalists &&
      messages.length > 0
    ) {
      scrollToDiv.current?.scrollIntoView();
      setPreviousConversationalists(props.conversationalists);
    }
  }, [props.conversationalists, messages]);

  // Force Div scrolling down when the current user sends a message
  React.useEffect(() => {
    if (!user?._id || lastMessage === null) return;

    if (lastMessage._id) {
      let foundMessage = false;
      let index = 0;
      while (index < messages.length && foundMessage === false) {
        if (messages[index]._id === lastMessage._id) {
          foundMessage = true;
          if (
            // If this isn't the last message
            index !== messages.length - 1 &&
            // And the next message was sent by the current user,
            messages[index + 1].from === user._id
          ) {
            // This means we have messages that come after our last message and that are sent by the current user,
            // and that we need to scroll down
            scrollToDiv.current?.scrollIntoView();
            setLastMessage(messages[messages.length - 1]);
          }
        }
        index++;
      }
    }
  }, [messages, user, lastMessage]);

  //#region Listeners
  const handleLoadMessages = (command: {
    fetchingNew: boolean;
    page: number;
  }) => {
    axios
      .request<SuccessResponseDto<PaginationResponse<IMessage>>>({
        method: "POST",
        url: "/messages/get",
        data: {
          usersIds: props.conversationalists,
          paginationCommand: {
            page: command.page,
            limit,
          },
        },
      })
      .then((res) => {
        const messages: IMessage[] = res.data.data.data;
        dispatch(
          chatSlice.actions.addMessages({
            // If we are receiving old messages in the pagination, then we reverse the result
            messages: command.fetchingNew ? messages : messages.reverse(),
            new: command.fetchingNew,
          })
        );
        setTotal(res.data.data.total);
        setPage(command.page);
        setLimit(limit);
        // We update the last received message
        if (command.fetchingNew && messages.length > 0) {
          setLastMessage(messages[messages.length - 1]);
        }
      });
  };

  const handleAddMessage = React.useCallback(
    (message: IMessage) => {
      dispatch(
        chatSlice.actions.addMessages({ messages: [message], new: true })
      );
    },

    [messages, dispatch]
  );

  const handleLoadMore = () => {
    if (total > messages.length) {
      handleLoadMessages({ fetchingNew: false, page: page + 1 });
    }
  };
  //#endregion Listeners

  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.chatMessagesBox}>
        {total > messages.length && (
          <div className={styles.loadMoreButtonContainer}>
            <Button className={styles.loadMoreButton} onClick={handleLoadMore}>
              ...
            </Button>
          </div>
        )}

        {messages.map((message) => {
          return <Message message={message} key={message._id} />;
        })}
        <div ref={scrollToDiv}></div>
      </div>
      <ChatInput
        conversationalists={props.conversationalists}
        handleAddMessage={handleAddMessage}
      />
    </div>
  );
};

export default React.memo(ChatBox);
