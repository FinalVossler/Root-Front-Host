import { AxiosResponse } from "axios";
import React from "react";
import { IAddressReadDto } from "roottypes";

import { useAppDispatch } from "../../store/hooks";
import { addressSlice } from "../../store/slices/addressSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useSetDefaultAddress = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const setDefaultAddress = (addressId: string) =>
    new Promise<IAddressReadDto[]>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "POST",
          url: "/addresses/setDefaultAddress",
          data: { addressId },
        })
        .then((res) => {
          dispatch(
            addressSlice.actions.setDefaultAddress({
              defaultAddressId: addressId,
            })
          );
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { setDefaultAddress, loading };
};

export default useSetDefaultAddress;
