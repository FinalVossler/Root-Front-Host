import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { roleSlice, IRole } from "../../store/slices/roleSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type RoleCreateCommand = {
  name: string;
  language: string;
};

const useCreateRole = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createRole = (command: RoleCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IRole>>({
          url: "/roles",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const role: IRole = res.data.data;
          dispatch(roleSlice.actions.addRole(role));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createRole, loading };
};

export default useCreateRole;
