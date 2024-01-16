import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { chatSlice, getConversationId } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUserReadDtoWithLastReadMessageInConversationReadDto } from "roottypes";

const useGetUsersWithTheirLastReadMessageInConversation = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUsersWithTheirLastReadMessageInConversation = (usersIds: string[]) =>
    new Promise<IUserReadDtoWithLastReadMessageInConversationReadDto[]>(
      (resolve, reject) => {
        setLoading(true);

        axios
          .request<
            AxiosResponse<
              IUserReadDtoWithLastReadMessageInConversationReadDto[]
            >
          >({
            method: "POST",
            url: "/users/getUsersWithTheirLastReadMessagesInConversation",
            data: {
              usersIds,
            },
          })
          .then((res) => {
            const users: IUserReadDtoWithLastReadMessageInConversationReadDto[] =
              res.data.data;
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
      }
    );

  return { getUsersWithTheirLastReadMessageInConversation, loading };
};

export default useGetUsersWithTheirLastReadMessageInConversation;
