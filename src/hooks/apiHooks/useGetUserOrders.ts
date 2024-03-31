import { AxiosResponse } from "axios";
import React from "react";
import { IPaginationCommand } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IOrderReadDto, IPaginationResponse } from "roottypes";
import { orderSlice } from "../../store/slices/orderSlice";

const useGetUserOrders = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUserOrders = (
    paginationCommand: IPaginationCommand,
    userId: string
  ) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IPaginationResponse<IOrderReadDto>>>({
          method: "POST",
          url: "/orders/getUserOrders",
          data: { paginationCommand, userId },
        })
        .then((res) => {
          dispatch(
            orderSlice.actions.setUserOrders({
              orders: res.data.data.data,
              userId,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUserOrders, loading };
};

export default useGetUserOrders;
