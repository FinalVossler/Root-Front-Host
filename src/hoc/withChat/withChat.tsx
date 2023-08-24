import React from "react";
import { Socket } from "socket.io-client";
//@ts-ignore
import { socketConnect } from "socket.io-react";

import ChatMessagesEnum from "../../globalTypes/ChatMessagesEnum";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  chatSlice,
  IMessage,
  getConversationId,
  IReaction,
  IPopulatedMessage,
  populatedMessageToMessage,
  Conversation,
} from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";
//@ts-ignore
import NotificationSound from "../../../public/assets/sounds/notification-sound.mp3";

import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import SocketTypingStateCommand from "../../globalTypes/SocketTypingStateCommand";

interface IChat {
  socket?: Socket;
}

const withChat = (Component: React.FunctionComponent<any>) =>
  socketConnect((props: IChat) => {
    const user: IUser = useAppSelector((state) => state.user.user);
    const withChat = useAppSelector(
      (state) => state.websiteConfiguration.withChat
    );
    const conversations: Conversation[] = useAppSelector(
      (state) => state.chat.conversations
    );

    const dispatch = useAppDispatch();
    const incomingMessagesListener = React.useRef<any>(null);
    const incomingReactionsListener = React.useRef<any>(null);
    const incomingTypingStatesListener = React.useRef<any>(null);
    const incomingLastReadMessageByUserInCovnersationListener =
      React.useRef<any>(null);
    const deleteMessagesListener = React.useRef<any>(null);
    const audioPlayerRef = React.useRef(null);
    const isLoggedIn = useIsLoggedIn();

    // If the user disconnects, the listeners should be reset. Because they still contain the older socket instance
    React.useEffect(() => {
      if (!isLoggedIn) {
        if (incomingMessagesListener.current !== null) {
          incomingMessagesListener.current = null;
        }
        if (incomingTypingStatesListener.current !== null) {
          incomingTypingStatesListener.current = null;
        }
        if (
          incomingLastReadMessageByUserInCovnersationListener.current !== null
        ) {
          incomingLastReadMessageByUserInCovnersationListener.current = null;
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
          (message: IPopulatedMessage) => {
            dispatch(
              chatSlice.actions.addMessages({
                messages: [populatedMessageToMessage(message)],
                currentUser: user,
                populatedMessages: [message],
              })
            );

            dispatch(
              chatSlice.actions.updateConversationUserLastReadMessage({
                lastMarkedMessageAsRead: populatedMessageToMessage(message),
                byId: message.from._id.toString(),
              })
            );

            // A message sent in another tab isn't captured in the current tab if we are the user who sent the message.
            if (message.from._id !== user._id) {
              dispatch(
                chatSlice.actions.incrementConversationTotalUnreadMessages({
                  usersIds: [...message.to.map((el) => el._id.toString())],
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
      if (incomingTypingStatesListener.current === null) {
        incomingTypingStatesListener.current ===
          props.socket.on(
            ChatMessagesEnum.ReceiveTypingState,
            (socketTypingStateCommand: SocketTypingStateCommand) => {
              if (
                socketTypingStateCommand.userId.toString() !==
                user._id.toString()
              ) {
                dispatch(
                  chatSlice.actions.setConversationUserTypingState(
                    socketTypingStateCommand
                  )
                );
              }
            }
          );
      }

      if (
        incomingLastReadMessageByUserInCovnersationListener.current === null
      ) {
        incomingLastReadMessageByUserInCovnersationListener.current ===
          props.socket.on(
            ChatMessagesEnum.ReceiveLastMarkedMessageAsReadByUser,
            ({
              lastMarkedMessageAsRead,
              by,
            }: {
              lastMarkedMessageAsRead;
              by: IUser;
            }) => {
              dispatch(
                chatSlice.actions.updateConversationUserLastReadMessage({
                  lastMarkedMessageAsRead,
                  by,
                })
              );
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
            if (reaction.user._id.toString() !== user._id.toString()) {
              dispatch(
                chatSlice.actions.addReactionToMessage({ message, reaction })
              );

              dispatch(
                chatSlice.actions.incrementConversationTotalUnreadMessages({
                  usersIds: [...message.to],
                  by: 1,
                })
              );

              dispatch(
                chatSlice.actions.markMessageAsUnread({ message, user })
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
    }, [props.socket?.on, withChat, isLoggedIn, conversations]);

    return (
      <React.Fragment>
        <audio ref={audioPlayerRef} src={NotificationSound} autoPlay={false} />
        <Component {...props} />
      </React.Fragment>
    );
  });

export default withChat;
