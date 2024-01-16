import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { chatSlice, getConversationId } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import useMarkAllConversationsMessagesAsReadByUser from "./useMarkAllConversationMessagesAsReadByUser";
import {
  IMessageGetBetweenUsersCommand,
  IMessageMarkAllMessagesAsReadByUserCommand,
  IMessageReadDto,
  IPaginationResponse,
  IUserReadDto,
} from "roottypes";

const useLoadMessages = () => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const axios = useAuthorizedAxios();
  const { markAllConversationMessagesAsReadByUser } =
    useMarkAllConversationsMessagesAsReadByUser();

  const loadMessages = (command: IMessageGetBetweenUsersCommand) =>
    new Promise<number>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IPaginationResponse<IMessageReadDto>>>({
          method: "POST",
          url: "/messages/get",
          data: command,
        })
        .then((res) => {
          const messages: IMessageReadDto[] = res.data.data.data;
          dispatch(
            chatSlice.actions.addMessages({
              messages,
              currentUser: user,
              populatedMessages: [],
            })
          );
          resolve(res.data.data.total);

          // Mark all the conversations we just fetched as read
          const markMessagesAsReadCommand: IMessageMarkAllMessagesAsReadByUserCommand =
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
