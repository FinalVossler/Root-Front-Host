import { AxiosResponse } from "axios";
import React from "react";
import {
  IShippingMethodCreateCommand,
  IShippingMethodReadDto,
} from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { shippingMethodSlice } from "../../store/slices/shippingMethodSlice";

const useCreateShippingMethod = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createShippingMethod = (command: IShippingMethodCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IShippingMethodReadDto>>({
          url: "/shippingMethods",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const shippingMethod: IShippingMethodReadDto = res.data.data;
          dispatch(
            shippingMethodSlice.actions.addShippingMethod(shippingMethod)
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createShippingMethod, loading };
};

export default useCreateShippingMethod;
