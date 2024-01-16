import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { roleSlice, IRoleReadDto } from "../../store/slices/roleSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IRoleCreateCommand } from "roottypes";

const useCreateRole = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createRole = (command: IRoleCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IRoleReadDto>>({
          url: "/roles",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const role: IRoleReadDto = res.data.data;
          dispatch(roleSlice.actions.addRole(role));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createRole, loading };
};

export default useCreateRole;
