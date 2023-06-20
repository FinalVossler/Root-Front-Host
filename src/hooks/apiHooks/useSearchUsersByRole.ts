import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUser } from "../../store/slices/userSlice";
import { UsersSearchCommand } from "./useSearchUsers";

type UserSearchByRoleCommand = {
  searchCommand: UsersSearchCommand;
  roleId: string;
};

const useSearchUsersByRole = () => {
  const [selectedUsers, setSelectedUsers] = React.useState<IUser[]>([]);

  const axios = useAuthorizedAxios();

  const handleSearchUsersByRolePromise =
    (roleId: string) =>
    (
      firstNameOrLastNameOrEmail: string,
      paginationCommand: PaginationCommand
    ) =>
      new Promise<PaginationResponse<IUser>>((resolve, _) => {
        const command: UserSearchByRoleCommand = {
          searchCommand: {
            paginationCommand: paginationCommand,
            firstNameOrLastNameOrEmail,
          },
          roleId,
        };

        axios
          .request<AxiosResponse<PaginationResponse<IUser>>>({
            url: "/users/searchByRole",
            method: "POST",
            data: command,
          })
          .then((res) => {
            resolve(res.data.data);
          });
      });

  const handleSelectUser = (user: IUser) => {
    setSelectedUsers([{ ...user }, ...selectedUsers]);
  };

  const handleRemoveSelectedRole = (index: number) => {
    let newSelectedRoles = [...selectedUsers];
    newSelectedRoles.splice(index, 1);
    setSelectedUsers(newSelectedRoles);
  };

  return {
    handleSelectUser,
    handleRemoveSelectedRole,
    selectedUsers,
    setSelectedUsers,
    handleSearchUsersByRolePromise,
  };
};

export default useSearchUsersByRole;
