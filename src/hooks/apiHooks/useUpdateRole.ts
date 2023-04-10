import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import {
  roleSlice,
  IRole,
  Permission,
  StaticPermission,
} from "../../store/slices/roleSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type RoleUpdateCommand = {
  _id: string;
  name: string;
  language: string;
  permissions: Permission[];

  entityPermissions: {
    modelId: string;
    permissions: StaticPermission[];
  }[];
};

const useUpdateRole = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateRole = (command: RoleUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IRole>>({
          url: "/roles",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const role: IRole = res.data.data;
          dispatch(roleSlice.actions.updateRole(role));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateRole, loading };
};

export default useUpdateRole;
