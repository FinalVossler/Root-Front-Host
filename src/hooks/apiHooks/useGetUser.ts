import { AxiosResponse } from "axios";
import React from "react";

import { IUser } from "../../store/slices/userSlice";
import useAxios from "../useAxios";

const useGetUser = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAxios();

  const getUser = (userId: string) =>
    new Promise<IUser>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IUser>>({
          method: "GET",
          url: "/users/getUser",
          params: {
            userId,
          },
        })
        .then((res) => {
          const user: IUser = res.data.data;
          resolve(user);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUser, loading };
};

export default useGetUser;
