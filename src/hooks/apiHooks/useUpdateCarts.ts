import React from "react";
import { ICartReadDto, ICartUpdateCommand } from "roottypes";
import { AxiosResponse } from "axios";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useUpdateCart = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const updateCart = (command: ICartUpdateCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      return axios
        .request<AxiosResponse<ICartReadDto>>({
          method: "PUT",
          data: command,
          url: "/cart",
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((e) => reject(e))
        .finally(() => setLoading(false));
    });

  return { updateCart, loading };
};

export default useUpdateCart;
