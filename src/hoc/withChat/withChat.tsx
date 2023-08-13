import React from "react";
import { Socket } from "socket.io-client";
//@ts-ignore
import { socketConnect } from "socket.io-react";

import ChatMessagesEnum from "../../globalTypes/ChatMessagesEnum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  chatSlice,
  getConversationId,
  IMessage,
} from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";
//@ts-ignore
import NotificationSound from "../../../public/assets/sounds/notification-sound.mp3";

import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { IReaction } from "../../store/slices/chatSlice";

interface IChat {
  socket?: Socket;
}

const withChat = (Component: React.FunctionComponent<any>) =>
  socketConnect((props: IChat) => {
    const user: IUser = useAppSelector((state) => state.user.user);
    const withChat = useAppSelector(
      (state) => state.websiteConfiguration.withChat
    );

    const dispatch = useAppDispatch();
    const incomingMessagesListener = React.useRef<any>(null);
    const incomingReactionsListener = React.useRef<any>(null);
    const deleteMessagesListener = React.useRef<any>(null);
    const audioPlayerRef = React.useRef(null);
    const isLoggedIn = useIsLoggedIn();

    // If the user disconnects, the listeners should be reset. Because they still contain the older socket instance
    React.useEffect(() => {
      if (!isLoggedIn) {
        if (incomingMessagesListener.current !== null) {
          incomingMessagesListener.current = null;
        }
        if (deleteMessagesListener.current !== null) {
          deleteMessagesListener.current = null;
        }
        if (incomingReactionsListener.current !== null) {
          incomingReactionsListener.current = null;
        }
      }
    }, [isLoggedIn]);

    // Listening to incoming messages
    React.useEffect(() => {
      if (!props.socket?.on || !withChat || !isLoggedIn) return;

      if (incomingMessagesListener.current === null) {
        incomingMessagesListener.current = props.socket?.on(
          ChatMessagesEnum.Receive,
          (message: IMessage) => {
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

              // NEW GOOGLE RULES: if the user never clicked or interacted with the page, the play() method will throw an error
              // because people prohibits auto playing a sound in a page without any user interaction
              //@ts-ignore
              if (audioPlayerRef.current) {
                //@ts-ignore
                audioPlayerRef.current.play().catch((e) => {});
              }
            }
          }
        );
      }
      if (incomingReactionsListener.current === null) {
        incomingReactionsListener.current = props.socket?.on(
          ChatMessagesEnum.ReaceiveReaction,
          ({
            message,
            reaction,
          }: {
            message: IMessage;
            reaction: IReaction;
          }) => {
            dispatch(
              chatSlice.actions.addReactionToMessage({ message, reaction })
            );
          }
        );
      }
      if (deleteMessagesListener.current === null) {
        deleteMessagesListener.current = props.socket.on(
          ChatMessagesEnum.Delete,
          (message: IMessage) => {
            const conversationId: string = getConversationId(message.to);

            dispatch(
              chatSlice.actions.deleteMessage({
                conversationId,
                messageId: message._id,
              })
            );
          }
        );
      }
    }, [props.socket?.on, withChat, isLoggedIn]);

    return (
      <React.Fragment>
        <audio ref={audioPlayerRef} src={NotificationSound} autoPlay={false} />
        <Component {...props} />
      </React.Fragment>
    );
  });

export default withChat;
