import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { chatSlice } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetUserTotalUnreadMessages = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUserTotalUnreadMessages = () =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<number>>({
          method: "POST",
          url: "/messages/userTotalUnreadMessages",
        })
        .then((res) => {
          dispatch(chatSlice.actions.setUserTotalUnreadMessages(res.data.data));
        })
        .catch((e) => reject(e))
        .finally(() => setLoading(false));
    });

  return { getUserTotalUnreadMessages, loading };
};

export default useGetUserTotalUnreadMessages;
