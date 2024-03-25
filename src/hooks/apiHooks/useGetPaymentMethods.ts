import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IPaymentMethodReadDto, IPaginationResponse } from "roottypes";
import { paymentMethodSlice } from "../../store/slices/paymentMethodSlice";

const useGetPaymentMethods = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getPaymentMethods = () =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IPaymentMethodReadDto[]>>({
          method: "GET",
          url: "/paymentMethods",
        })
        .then((res) => {
          dispatch(
            paymentMethodSlice.actions.setPaymentMethods({
              paymentMethods: res.data.data,
              total: res.data.data.length,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getPaymentMethods: getPaymentMethods, loading };
};

export default useGetPaymentMethods;
