import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { chatSlice } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { AxiosResponse } from "axios";

export type MessageMarkMessagesAsReadByUserCommand = {
  messagesIds: string[];
};

const useMarkMessagesAsRead = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const markMessageAsRead = (
    command: MessageMarkMessagesAsReadByUserCommand,
    conversationId: string,
    userId: string
  ) =>
    new Promise<number>((resolve, reject) => {
      setLoading(true);
      axios
        .request({
          method: "POST",
          url: "/messages/markMessagesAsRead",
          data: command,
        })
        .then((res: AxiosResponse<number>) => {
          dispatch(
            chatSlice.actions.markConversationMessagesAsReadByUser({
              conversationId,
              userId,
            })
          );
          dispatch(chatSlice.actions.setUserTotalUnreadMessages(res.data));
          resolve(res.data);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { markMessageAsRead, loading };
};

export default useMarkMessagesAsRead;
