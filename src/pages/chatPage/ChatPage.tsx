import React from "react";
import { useTheme } from "react-jss";
import { AiFillHome } from "react-icons/ai";
import { socketConnect } from "socket.io-react";
import { Socket } from "socket.io-client";

import ChatContacts from "../../components/chatComponents/chatContacts";
import ChatBox from "../../components/chatComponents/chatBox";

import { Theme } from "../../config/theme";
import SuccessResponseDto from "../../globalTypes/SuccessResponseDto";
import withProtection from "../../hoc/protection";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { chatSlice, IMessage } from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./chatPage.styles";
import ChatMessagesEnum from "../../globalTypes/ChatMessagesEnum";
import withWrapper from "../../hoc/wrapper";
import Banner from "../../components/banner";

interface IChat {
  socket: Socket;
}

const Chat: React.FunctionComponent<IChat> = (props: IChat) => {
  const user: IUser = useAppSelector((state) => state.user.user);
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
      .request<SuccessResponseDto<IUser[]>>({
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
  }, [props.socket]);

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatPageContent}>
        <ChatContacts />

        <div className={styles.chatButtons}>
          <a href="/">
            <AiFillHome className={styles.chatButton} />
          </a>
        </div>

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
