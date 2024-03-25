import { AxiosResponse } from "axios";
import React from "react";
import { IAddressReadDto, IAddressUpdateCommand } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import { addressSlice } from "../../store/slices/addressSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useUpdateAddress = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateAddress = (command: IAddressUpdateCommand) =>
    new Promise<IAddressReadDto[]>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IAddressReadDto>>({
          method: "PUT",
          url: "/addresses",
          data: command,
        })
        .then((res) => {
          const address: IAddressReadDto = res.data.data;

          dispatch(addressSlice.actions.updateAddress(address));
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateAddress, loading };
};

export default useUpdateAddress;
