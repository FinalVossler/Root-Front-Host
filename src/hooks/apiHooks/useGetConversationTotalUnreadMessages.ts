import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import {
  chatSlice,
  getConversationConversationalistsFromConversationId,
} from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetConversationTotalUnreadMessages = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getTotalUnreadMessages = (conversationId: string) =>
    new Promise((resolve, reject) => {
      const participants: string[] =
        getConversationConversationalistsFromConversationId(conversationId);

      setLoading(true);
      axios
        .request<AxiosResponse<number>>({
          method: "POST",
          url: "/messages/conversationTotalUnreadMessages",
          data: participants,
        })
        .then((res) => {
          dispatch(
            chatSlice.actions.setConversationTotalUnreadMessages({
              usersIds: participants,
              totalUnreadMessages: res.data.data,
            })
          );
        })
        .catch((e) => reject(e))
        .finally(() => setLoading(false));
    });

  return { getTotalUnreadMessages, loading };
};

export default useGetConversationTotalUnreadMessages;
