import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  chatSlice,
  getConversationId,
  IMessage,
} from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import useMarkAllConversationsMessagesAsReadByUser, {
  MessageMarkAllMessagesAsReadByUserCommand,
} from "./useMarkAllConversationMessagesAsReadByUser";

export type MessageGetBetweenUsersCommand = {
  paginationCommand: PaginationCommand;
  usersIds: string[];
};

const useLoadMessages = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const axios = useAuthorizedAxios();
  const { markAllConversationMessagesAsReadByUser } =
    useMarkAllConversationsMessagesAsReadByUser();

  const loadMessages = (command: MessageGetBetweenUsersCommand) =>
    new Promise<number>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<PaginationResponse<IMessage>>>({
          method: "POST",
          url: "/messages/get",
          data: command,
        })
        .then((res) => {
          const messages: IMessage[] = res.data.data.data;
          dispatch(
            chatSlice.actions.addMessages({
              messages,
              currentUser: user,
              populatedMessages: [],
            })
          );
          resolve(res.data.data.total);

          // Mark all the conversations we just fetched as read
          const markMessagesAsReadCommand: MessageMarkAllMessagesAsReadByUserCommand =
            {
              to: command.usersIds,
            };
          markAllConversationMessagesAsReadByUser(
            markMessagesAsReadCommand,
            getConversationId(command.usersIds),
            user._id
          );
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { loadMessages, loading };
};

export default useLoadMessages;
