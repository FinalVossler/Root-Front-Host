import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { chatSlice, IMessage } from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type MessageGetBetweenUsersCommand = {
  paginationCommand: PaginationCommand;
  usersIds: string[];
};

const useLoadMessages = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const axios = useAuthorizedAxios();

  const loadMessages = (command: MessageGetBetweenUsersCommand) =>
    new Promise<number>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<PaginationResponse<IMessage>>>({
          method: "POST",
          url: "/messages/get",
          data: command,
        })
        .then((res) => {
          const messages: IMessage[] = res.data.data.data;
          dispatch(
            chatSlice.actions.addMessages({
              // messages: messages.map((m) => ({
              //   ...m,
              //   // the user just loaded these messages in the chat box. They must be set as read
              //   read:
              //     m.read.indexOf(user._id) === -1
              //       ? [...m.read, user._id]
              //       : m.read,
              // })),
              messages,
              currentUser: user,
              populatedMessages: [],
            })
          );
          resolve(res.data.data.total);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { loadMessages, loading };
};

export default useLoadMessages;
