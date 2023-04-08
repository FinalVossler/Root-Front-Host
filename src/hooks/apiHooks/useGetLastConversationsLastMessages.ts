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

          // We need to fill the contacts information that are concerned with the messages
          // const contacts: IUser[] = [];
          // result.messages.forEach((message) => {
          //   message.to.map((potentialUser) => {
          //     if (
          //       potentialUser._id !== user._id &&
          //       !contacts.find((c) => c._id === potentialUser._id)
          //     ) {
          //       contacts.push(potentialUser);
          //     }
          //   });
          // });
          // dispatch(chatSlice.actions.setContacts(contacts));

          dispatch(chatSlice.actions.setLastConversationsLastMessages(result));
          resolve(result);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getLastConversationsLastMessages, loading };
};

export default useGetLastConversationsLastMessages;
