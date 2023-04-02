import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { chatSlice } from "../../store/slices/chatSlice";
import { PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type ChatGetContactsCommand = {
  paginationCommand: PaginationCommand;
};

const useGetChatContacts = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getChatContacts = (command: ChatGetContactsCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IUser>>>({
          method: "POST",
          url: "/users/getChatContacts",
          data: command,
        })
        .then((res) => {
          dispatch(chatSlice.actions.setContacts(res.data.data.data));
          dispatch(chatSlice.actions.setContactsTotal(res.data.data.total));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getChatContacts, loading };
};

export default useGetChatContacts;
