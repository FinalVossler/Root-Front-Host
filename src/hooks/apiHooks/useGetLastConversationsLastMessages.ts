import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { chatSlice, IPopulatedMessage } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type MessageGetLastConversations = {
  paginationCommand: PaginationCommand;
};

const useGetLastConversationsLastMessages = () => {
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
          resolve(result);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getLastConversationsLastMessages, loading };
};

export default useGetLastConversationsLastMessages;
