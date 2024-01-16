import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { chatSlice } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { AxiosResponse } from "axios";
import { IMessageMarkAllMessagesAsReadByUserCommand } from "roottypes";

const useMarkAllConversationsMessagesAsReadByUser = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const markAllConversationMessagesAsReadByUser = (
    command: IMessageMarkAllMessagesAsReadByUserCommand,
    conversationId: string,
    userId: string
  ) =>
    new Promise<number>((resolve, reject) => {
      setLoading(true);
      dispatch(
        chatSlice.actions.markConversationMessagesAsReadByUser({
          conversationId,
          userId,
        })
      );
      axios
        .request<AxiosResponse<number>>({
          method: "POST",
          url: "/messages/markAllConversationMessagesAsReadByUser",
          data: command,
        })
        .then((res) => {
          dispatch(chatSlice.actions.setUserTotalUnreadMessages(res.data.data));
          resolve(res.data.data);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { markAllConversationMessagesAsReadByUser, loading };
};

export default useMarkAllConversationsMessagesAsReadByUser;
