import { AxiosResponse } from "axios";
import React from "react";
import { IPaymentMethodCreateCommand, IPaymentMethodReadDto } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { paymentMethodSlice } from "../../store/slices/paymentMethodSlice";

const useCreatePaymentMethod = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createPaymentMethod = (command: IPaymentMethodCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IPaymentMethodReadDto>>({
          url: "/paymentMethods",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const paymentMethod: IPaymentMethodReadDto = res.data.data;
          dispatch(paymentMethodSlice.actions.addPaymentMethod(paymentMethod));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createPaymentMethod, loading };
};

export default useCreatePaymentMethod;
