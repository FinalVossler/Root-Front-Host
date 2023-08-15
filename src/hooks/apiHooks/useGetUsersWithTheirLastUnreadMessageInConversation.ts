import { AxiosResponse } from "axios";
import React from "react";

import {
  IUser,
  UserWithLastUnreadMessageInConversation,
} from "../../store/slices/userSlice";
import useAxios from "../useAxios";
import { useAppDispatch } from "../../store/hooks";
import { chatSlice, getConversationId } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetUsersWithTheirLastUnreadMessageInConversation = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUsersWithTheirLastUnreadMessageInConversation = (
    usersIds: string[]
  ) =>
    new Promise<UserWithLastUnreadMessageInConversation[]>(
      (resolve, reject) => {
        setLoading(true);

        axios
          .request<AxiosResponse<UserWithLastUnreadMessageInConversation[]>>({
            method: "GET",
            url: "/users/getUsersWithTheirLastUnreadMessagesInConversation",
            params: {
              usersIds,
            },
          })
          .then((res) => {
            const users: UserWithLastUnreadMessageInConversation[] =
              res.data.data;
            dispatch(
              chatSlice.actions.setConversationUsersWithTheirLastUnreadMessage({
                conversationId: getConversationId(usersIds),
                usersWithTheirLastUnreadMessageInConversation: users,
              })
            );
            resolve(users);
          })
          .finally(() => setLoading(false))
          .catch((e) => reject(e));
      }
    );

  return { getUsersWithTheirLastUnreadMessageInConversation, loading };
};

export default useGetUsersWithTheirLastUnreadMessageInConversation;
