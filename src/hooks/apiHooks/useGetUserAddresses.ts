import { AxiosResponse } from "axios";
import React from "react";
import { IAddressReadDto } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import { addressSlice } from "../../store/slices/addressSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetUserAddresses = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getUserAddresses = (userId: string) =>
    new Promise<IAddressReadDto[]>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IAddressReadDto[]>>({
          method: "POST",
          url: "/addresses/getUserAddresses",
          data: {
            userId,
          },
        })
        .then((res) => {
          const addresses: IAddressReadDto[] = res.data.data;

          dispatch(addressSlice.actions.setCurrentUserAddresses(addresses));
          resolve(addresses);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getUserAddresses, loading };
};

export default useGetUserAddresses;
