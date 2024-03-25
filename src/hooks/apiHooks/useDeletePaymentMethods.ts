import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { paymentMethodSlice } from "../../store/slices/paymentMethodSlice";

const useDeletePaymentMethods = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deletePaymentMethods = (paymentMethodsIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/paymentMethods",
          data: { paymentMethodsIds },
        })
        .then((res) => {
          dispatch(
            paymentMethodSlice.actions.deletePaymentMethods(paymentMethodsIds)
          );
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deletePaymentMethods, loading };
};

export default useDeletePaymentMethods;
