import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  roleSlice,
  IRole,
  Permission,
  StaticPermission,
} from "../../store/slices/roleSlice";
import { IUser, userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

type EntityPermissionUpdateCommand = {
  modelId: string;
  permissions: StaticPermission[];
  fieldPermissions: {
    fieldId: string;
    permissions: StaticPermission[];
  }[];
};

export type RoleUpdateCommand = {
  _id: string;
  name: string;
  language: string;
  permissions: Permission[];

  entityPermissions: EntityPermissionUpdateCommand[];
};

const useUpdateRole = () => {
  const user: IUser = useAppSelector((state) => state.user.user);

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

          // Updating user role
          if (command._id === user.role?._id) {
            dispatch(userSlice.actions.updateUserRoleAfterRoleUpdate(role));
          }
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateRole, loading };
};

export default useUpdateRole;
