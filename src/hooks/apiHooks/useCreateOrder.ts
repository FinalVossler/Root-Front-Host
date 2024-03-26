import { AxiosResponse } from "axios";
import React from "react";
import { IOrderCreateCommand, IOrderReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useCreateOrder = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();

  const createOrder = (command: IOrderCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IOrderReadDto>>({
          url: "/orders",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const order: IOrderReadDto = res.data.data;
          resolve(order);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createOrder, loading };
};

export default useCreateOrder;
