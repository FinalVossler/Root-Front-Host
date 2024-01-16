import { AxiosResponse } from "axios";
import React from "react";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { roleSlice } from "../../store/slices/roleSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IRoleReadDto, IRolesGetCommand } from "roottypes";

const useGetRoles = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getRoles = (command: IRolesGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IRoleReadDto>>>({
          method: "POST",
          url: "/roles/getRoles",
          data: command,
        })
        .then((res) => {
          dispatch(
            roleSlice.actions.setRoles({
              roles: res.data.data.data,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getRoles: getRoles, loading };
};

export default useGetRoles;
