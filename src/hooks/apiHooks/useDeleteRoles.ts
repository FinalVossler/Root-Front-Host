import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { roleSlice } from "../../store/slices/roleSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useDeleteRoles = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteRoles = (rolesIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/roles",
          data: rolesIds,
        })
        .then((res) => {
          dispatch(roleSlice.actions.deleteRoles(rolesIds));
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteRoles, loading };
};

export default useDeleteRoles;
