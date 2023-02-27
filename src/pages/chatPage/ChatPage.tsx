import React from "react";
import { useTheme } from "react-jss";
import { socketConnect } from "socket.io-react";
import { AxiosResponse } from "axios";
import { Socket } from "socket.io-client";

import ChatContacts from "../../components/chatComponents/chatContacts";
import ChatBox from "../../components/chatComponents/chatBox";

import { Theme } from "../../config/theme";
import withProtection from "../../hoc/protection";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  chatSlice,
  getConversationId,
  IMessage,
} from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./chatPage.styles";
import ChatMessagesEnum from "../../globalTypes/ChatMessagesEnum";
import withWrapper from "../../hoc/wrapper";

interface IChat {
  socket: Socket;
}

const Chat: React.FunctionComponent<IChat> = (props: IChat) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const withChat: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withChat
  );
  const selectedConversationId: string | undefined = useAppSelector(
    (state) => state.chat.selectedConversationId
  );

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  // Get the list of contacts
  React.useEffect(() => {
    axios
      .request<AxiosResponse<IUser[]>>({
        url: "/users",
        method: "GET",
      })
      .then((res) => {
        dispatch(chatSlice.actions.setContacts(res.data.data));
      });
  }, [axios]);

  // Listening to incoming messages
  React.useEffect(() => {
    if (!props.socket.on) return;

    props.socket.on(ChatMessagesEnum.Receive, (message: IMessage) => {
      dispatch(
        chatSlice.actions.addMessages({
          messages: [message],
          currentUser: user,
        })
      );

      dispatch(
        chatSlice.actions.incrementConversationTotalUnreadMessages({
          usersIds: [...message.to],
          by: 1,
        })
      );
    });

    props.socket.on(ChatMessagesEnum.Delete, (message: IMessage) => {
      const conversationId: string = getConversationId(message.to);

      dispatch(
        chatSlice.actions.deleteMessage({
          conversationId,
          messageId: message._id,
        })
      );
    });
  }, [props.socket]);

  if (!withChat) return null;

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatPageContent}>
        <ChatContacts />

        {selectedConversationId && (
          <ChatBox conversationId={selectedConversationId} />
        )}

        {!selectedConversationId && (
          <div className={styles.chatWelcome}>
            <img className={styles.chatRobot} src="/robot.gif" />
            <span className={styles.welcomeText}>
              Welcome,{" "}
              <span className={styles.welcomeTextUserName}>
                {user.firstName} {user.lastName}
              </span>
            </span>

            <span className={styles.chatDirectionText}>
              Please select a chat to start messaging
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default withWrapper(withProtection(socketConnect(Chat)), false);
