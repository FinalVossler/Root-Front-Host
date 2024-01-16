import { AxiosResponse } from "axios";
import React from "react";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUserReadDto } from "roottypes";

const useGetContactsByIds = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();

  const getContactsByIds = (usersIds: string[]) =>
    new Promise<IUserReadDto[]>((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IUserReadDto[]>>({
          method: "POST",
          url: "/users/getContactsByIds",
          data: {
            usersIds,
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
