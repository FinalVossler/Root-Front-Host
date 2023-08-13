import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { chatSlice, IPopulatedMessage } from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type MessageGetLastConversations = {
  paginationCommand: PaginationCommand;
};

const useGetLastConversationsLastMessages = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getLastConversationsLastMessages = (
    command: MessageGetLastConversations
  ) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IPopulatedMessage>>>({
          method: "POST",
          url: "/messages/getLastConversationsLastMessages",
          data: command,
        })
        .then((res) => {
          const result = {
            messages: res.data.data.data,
            total: res.data.data.total,
          };

          dispatch(chatSlice.actions.setLastConversationsLastMessages(result));
          result.messages.forEach((message) => {
            dispatch(
              chatSlice.actions.setConversationTotalUnreadMessages({
                usersIds: [...message.to.map((u) => u._id.toString())],
                totalUnreadMessages: message.totalUnreadMessages || 0,
              })
            );
            dispatch(
              chatSlice.actions.setAlreadyLoadedConversationsLastMessagesToTrue()
            );
          });
          resolve(result);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getLastConversationsLastMessages, loading };
};

export default useGetLastConversationsLastMessages;
