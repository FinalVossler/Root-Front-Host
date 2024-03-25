import { AxiosResponse } from "axios";
import React from "react";
import { IAddressCreateCommand, IAddressReadDto } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import { addressSlice } from "../../store/slices/addressSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useCreateAddress = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createAddress = (command: IAddressCreateCommand) =>
    new Promise<IAddressReadDto[]>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IAddressReadDto>>({
          method: "POST",
          url: "/addresses",
          data: command,
        })
        .then((res) => {
          const address: IAddressReadDto = res.data.data;

          dispatch(addressSlice.actions.addAddress(address));
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createAddress, loading };
};

export default useCreateAddress;
