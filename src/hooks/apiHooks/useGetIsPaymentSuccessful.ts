import { AxiosResponse } from "axios";
import React from "react";
import { IOrderReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetIsPaymentSuccessful = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getIsPaymentSuccessful = (orderId: string) =>
    new Promise<{ order: IOrderReadDto; isPaymentSuccessful: boolean }>(
      (resolve, reject) => {
        setLoading(true);

        axios
          .request<
            AxiosResponse<{
              isPaymentSuccessful: boolean;
              order: IOrderReadDto;
            }>
          >({
            method: "GET",
            url: "/orders/isPaymentSuccessful/" + orderId,
          })
          .then((res) => {
            resolve(res.data.data);
          })
          .finally(() => setLoading(false))
          .catch((e) => reject(e));
      }
    );

  return { getIsPaymentSuccessful, loading };
};

export default useGetIsPaymentSuccessful;
