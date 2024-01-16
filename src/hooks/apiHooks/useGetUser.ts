import { AxiosResponse } from "axios";
import React from "react";

import useAxios from "../useAxios";
import { IUserReadDto } from "roottypes";

const useGetUser = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAxios();

  const getUser = (userId: string) =>
    new Promise<IUserReadDto>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IUserReadDto>>({
          method: "GET",
          url: "/users/getUser",
          params: {
            userId,
          },
        })
        .then((res) => {
          const user: IUserReadDto = res.data.data;
          resolve(user);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUser, loading };
};

export default useGetUser;
