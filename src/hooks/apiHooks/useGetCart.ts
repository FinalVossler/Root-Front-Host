import React from "react";
import { AxiosResponse } from "axios";
import { ICartReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { useAppDispatch } from "../../store/hooks";
import { cartSlice } from "../../store/slices/cartSlice";

const useGetCart = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getCart = () =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<ICartReadDto>>({
          url: "/cart",
          method: "GET",
        })
        .then((res) => {
          dispatch(cartSlice.actions.setCart(res.data.data));
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          setLoading(false);
        });
    });

  return { getCart, loading };
};

export default useGetCart;
