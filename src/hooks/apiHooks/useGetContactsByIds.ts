import { AxiosResponse } from "axios";
import React from "react";

import { IUser } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetContactsByIds = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();

  const getContactsByIds = (usersIds: string[]) =>
    new Promise<IUser[]>((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IUser[]>>({
          method: "GET",
          url: "/users/getContactsByIds",
          params: {
            usersIds: usersIds.join(","),
          },
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getContactsByIds, loading };
};

export default useGetContactsByIds;
