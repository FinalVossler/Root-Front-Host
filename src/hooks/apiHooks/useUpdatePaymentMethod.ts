import { AxiosResponse } from "axios";
import React from "react";
import { IPaymentMethodReadDto, IPaymentMethodUpdateCommand } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { paymentMethodSlice } from "../../store/slices/paymentMethodSlice";

const useUpdatePaymentMethod = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updatePaymentMethod = (command: IPaymentMethodUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IPaymentMethodReadDto>>({
          url: "/paymentMethods",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const paymentMethod: IPaymentMethodReadDto = res.data.data;
          dispatch(
            paymentMethodSlice.actions.updatePaymentMethod(paymentMethod)
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updatePaymentMethod, loading };
};

export default useUpdatePaymentMethod;
