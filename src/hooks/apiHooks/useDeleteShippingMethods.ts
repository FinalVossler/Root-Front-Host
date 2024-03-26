import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { shippingMethodSlice } from "../../store/slices/shippingMethodSlice";

const useDeleteShippingMethods = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteShippingMethods = (shippingMethodsIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/shippingMethods",
          data: { shippingMethodsIds },
        })
        .then((res) => {
          dispatch(
            shippingMethodSlice.actions.deleteShippingMethods(
              shippingMethodsIds
            )
          );
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteShippingMethods, loading };
};

export default useDeleteShippingMethods;
