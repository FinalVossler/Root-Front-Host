import { AxiosResponse } from "axios";
import React from "react";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUserReadDto } from "roottypes";

const useGetUsersByIds = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getUsersByIds = (usersIds: string[]) =>
    new Promise<IUserReadDto[]>((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IUserReadDto[]>>({
          method: "POST",
          url: "/users/getUsersByIds",
          data: { usersIds },
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUsersByIds: getUsersByIds, loading };
};

export default useGetUsersByIds;
