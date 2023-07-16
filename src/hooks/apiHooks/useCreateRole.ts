import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import {
  roleSlice,
  IRole,
  Permission,
  StaticPermission,
  EntityEventNotificationTrigger,
} from "../../store/slices/roleSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

type EntityEventNotificationCreateCommand = {
  title: string;
  text: string;
  trigger: EntityEventNotificationTrigger;
  language: string;
};

type EntityPermissionCreateCommand = {
  modelId: string;
  permissions: StaticPermission[];
  entityFieldPermissions: {
    fieldId: string;
    permissions: StaticPermission[];
  }[];
  entityEventNotifications: EntityEventNotificationCreateCommand[];
  entityUserAssignmentPermissionsByRole: {
    // used to also add the current role that's just been added
    canAssignToUserFromSameRole: boolean;
    otherRolesIds: string[];
  };
  language: string;
};

export type RoleCreateCommand = {
  name: string;
  language: string;
  permissions: Permission[];
  entityPermissions: EntityPermissionCreateCommand[];
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
