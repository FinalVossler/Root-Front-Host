import { AxiosResponse } from "axios";
import React from "react";

import { UserWithLastReadMessageInConversation } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { chatSlice, getConversationId } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetUsersWithTheirLastReadMessageInConversation = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUsersWithTheirLastReadMessageInConversation = (usersIds: string[]) =>
    new Promise<UserWithLastReadMessageInConversation[]>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<UserWithLastReadMessageInConversation[]>>({
          method: "GET",
          url: "/users/getUsersWithTheirLastReadMessagesInConversation",
          params: {
            usersIds,
          },
        })
        .then((res) => {
          const users: UserWithLastReadMessageInConversation[] = res.data.data;
          dispatch(
            chatSlice.actions.setConversationUsersWithTheirLastReadMessage({
              conversationId: getConversationId(usersIds),
              usersWithTheirLastReadMessageInConversation: users,
            })
          );
          resolve(users);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUsersWithTheirLastReadMessageInConversation, loading };
};

export default useGetUsersWithTheirLastReadMessageInConversation;
