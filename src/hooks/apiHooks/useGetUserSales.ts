import { AxiosResponse } from "axios";
import React from "react";
import { IPaginationCommand } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IOrderReadDto, IPaginationResponse } from "roottypes";
import { orderSlice } from "../../store/slices/orderSlice";

const useGetUserSales = () => {
  const [loading, setLoading] = React.useState<boolean>();

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUserSales = (
    paginationCommand: IPaginationCommand,
    userId: string
  ) =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<IPaginationResponse<IOrderReadDto>>>({
          method: "POST",
          url: "/orders/getUserSales",
          data: { paginationCommand, userId },
        })
        .then((res) => {
          dispatch(
            orderSlice.actions.setUserSales({
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

  return { getUserSales, loading };
};

export default useGetUserSales;
