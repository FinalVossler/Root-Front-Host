import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { addressSlice } from "../../store/slices/addressSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { toast } from "react-toastify";

const useDeleteAddresses = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteAddresses = (addressesIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/addresses",
          data: { addressesIds },
        })
        .then((res) => {
          dispatch(addressSlice.actions.deleteAddresses(addressesIds));
          resolve(res);
          toast.success("👌");
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteAddresses, loading };
};

export default useDeleteAddresses;
