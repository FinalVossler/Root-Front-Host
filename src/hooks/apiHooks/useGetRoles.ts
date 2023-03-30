import { AxiosResponse } from "axios";
import React from "react";
import PaginationCommand from "../../globalTypes/PaginationCommand";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { roleSlice, IRole } from "../../store/slices/roleSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type RolesGetCommand = {
  paginationCommand: PaginationCommand;
};

const useGetRoles = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getRoles = (command: RolesGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IRole>>>({
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
