import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IShippingMethodReadDto, IPaginationResponse } from "roottypes";
import { shippingMethodSlice } from "../../store/slices/shippingMethodSlice";

const useGetShippingMethods = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getShippingMethods = () =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IShippingMethodReadDto[]>>({
          method: "GET",
          url: "/shippingMethods",
        })
        .then((res) => {
          dispatch(
            shippingMethodSlice.actions.setShippingMethods({
              shippingMethods: res.data.data,
              total: res.data.data.length,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getShippingMethods: getShippingMethods, loading };
};

export default useGetShippingMethods;
