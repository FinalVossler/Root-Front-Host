import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import SuccessResponseDto from "../../../globalTypes/SuccessResponseDto";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { IMessage } from "../../../store/slices/chatSlice";
import ChatInput from "../chatInput";
import Message from "../message/Message";

import useStyles from "./chatBox.styles";

interface IChatBox {
  selectedContacts: string[];
}
const ChatBox: React.FunctionComponent<IChatBox> = (props: IChatBox) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(10);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();

  React.useEffect(() => {
    axios
      .request<SuccessResponseDto<IMessage[]>>({
        method: "POST",
        url: "/messages/get",
        data: {
          usersIds: props.selectedContacts,
          paginationCommand: {
            page,
            limit,
          },
        },
      })
      .then((res) => {
        setMessages(res.data.data);
      });
  }, [props.selectedContacts]);

  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.chatMessagesBox}>
        {messages.map((message) => {
          return <Message message={message} key={message._id} />;
        })}
      </div>
      <ChatInput />
    </div>
  );
};

export default React.memo(ChatBox);
