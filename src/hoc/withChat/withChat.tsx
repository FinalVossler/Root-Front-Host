import React from "react";
import { Socket } from "socket.io-client";
import { socketConnect } from "socket.io-react";

import ChatMessagesEnum from "../../globalTypes/ChatMessagesEnum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  chatSlice,
  getConversationId,
  IMessage,
} from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";

interface IChat {
  socket: Socket;
}

const withChat = (Component: React.FunctionComponent<any>) =>
  socketConnect((props: IChat) => {
    const user: IUser = useAppSelector((state) => state.user.user);
    const withChat = useAppSelector(
      (state) => state.websiteConfiguration.withChat
    );

    const dispatch = useAppDispatch();

    // Listening to incoming messages
    React.useEffect(() => {
      if (!props.socket.on || !withChat) return;

      props.socket.on(ChatMessagesEnum.Receive, (message: IMessage) => {
        dispatch(
          chatSlice.actions.addMessages({
            messages: [message],
            currentUser: user,
          })
        );

        if (message.from !== user._id) {
          dispatch(
            chatSlice.actions.incrementConversationTotalUnreadMessages({
              usersIds: [...message.to],
              by: 1,
            })
          );
        }
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

    return <Component {...props} />;
  });

export default withChat;
