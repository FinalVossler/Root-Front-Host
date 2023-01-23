import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import SuccessResponseDto from "../../../globalTypes/SuccessResponseDto";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatSlice, IMessage } from "../../../store/slices/chatSlice";
import ChatInput from "../chatInput";
import Message from "../message/Message";

import useStyles from "./chatBox.styles";

interface IChatBox {
  conversationalists: string[];
}

const ChatBox: React.FunctionComponent<IChatBox> = (props: IChatBox) => {
  const messages =
    useAppSelector(
      (state) =>
        state.chat.conversations.find(
          (el) => el.id === props.conversationalists.sort().join()
        )?.messages
    ) || [];

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(10);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const scrollToDiv = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Scrolling to the bottom of the chat
  React.useEffect(() => {
    scrollToDiv.current?.scrollIntoView();
  }, [props.conversationalists, messages]);

  // Getting messages
  React.useEffect(() => {
    axios
      .request<SuccessResponseDto<IMessage[]>>({
        method: "POST",
        url: "/messages/get",
        data: {
          usersIds: props.conversationalists,
          paginationCommand: {
            page,
            limit,
          },
        },
      })
      .then((res) => {
        dispatch(chatSlice.actions.addMessages(res.data.data));

        scrollToDiv.current?.scrollIntoView();
      });
  }, [props.conversationalists]);

  const handleAddMessage = React.useCallback(
    (message: IMessage) => {
      dispatch(chatSlice.actions.addMessages([message]));
    },
    [messages, dispatch]
  );

  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.chatMessagesBox}>
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
