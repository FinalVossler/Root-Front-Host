import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { roleSlice } from "../../store/slices/roleSlice";
import { userSlice } from "../../store/slices/userSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import {
  IEntityPermissionUpdateCommand,
  IRoleReadDto,
  IUserReadDto,
  PermissionEnum,
} from "roottypes";

export type RoleUpdateCommand = {
  _id: string;
  name: string;
  language: string;
  permissions: PermissionEnum[];

  entityPermissions: IEntityPermissionUpdateCommand[];
};

const useUpdateRole = () => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateRole = (command: RoleUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IRoleReadDto>>({
          url: "/roles",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const role: IRoleReadDto = res.data.data;
          dispatch(roleSlice.actions.updateRole(role));

          // Updating user role
          if (command._id === (user.role as IRoleReadDto)?._id) {
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
