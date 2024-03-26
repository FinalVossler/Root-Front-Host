import { AxiosResponse } from "axios";
import React from "react";
import {
  IShippingMethodReadDto,
  IShippingMethodUpdateCommand,
} from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { shippingMethodSlice } from "../../store/slices/shippingMethodSlice";

const useUpdateShippingMethod = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateShippingMethod = (command: IShippingMethodUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IShippingMethodReadDto>>({
          url: "/shippingMethods",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const shippingMethod: IShippingMethodReadDto = res.data.data;
          dispatch(
            shippingMethodSlice.actions.updateShippingMethod(shippingMethod)
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateShippingMethod, loading };
};

export default useUpdateShippingMethod;
