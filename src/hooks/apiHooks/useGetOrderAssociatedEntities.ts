import { AxiosResponse } from "axios";
import React from "react";
import { IEntityReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { useAppDispatch } from "../../store/hooks";
import { orderSlice } from "../../store/slices/orderSlice";

const useGetOrderAssociatedEntities = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getOrderAssociatedEntities = (orderId: string) =>
    new Promise<IEntityReadDto[]>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IEntityReadDto[]>>({
          method: "GET",
          url: "/orders/getOrderAssociatedEntities/" + orderId,
        })
        .then((res) => {
          dispatch(
            orderSlice.actions.setOrderAssociatedEntities({
              orderId,
              associatedEntities: res.data.data,
            })
          );

          resolve(res.data.data);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getOrderAssociatedEntities, loading };
};

export default useGetOrderAssociatedEntities;
