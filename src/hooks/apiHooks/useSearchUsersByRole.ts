import React from "react";
import { AxiosResponse } from "axios";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import {
  IPaginationCommand,
  IUserReadDto,
  IUserSearchByRoleCommand,
} from "roottypes";

const useSearchUsersByRole = () => {
  const [selectedUsers, setSelectedUsers] = React.useState<IUserReadDto[]>([]);

  const axios = useAuthorizedAxios();

  const handleSearchUsersByRolePromise =
    (roleId: string) =>
    (
      firstNameOrLastNameOrEmail: string,
      paginationCommand: IPaginationCommand
    ) =>
      new Promise<PaginationResponse<IUserReadDto>>((resolve, _) => {
        const command: IUserSearchByRoleCommand = {
          searchCommand: {
            paginationCommand: paginationCommand,
            firstNameOrLastNameOrEmail,
          },
          roleId,
        };

        axios
          .request<AxiosResponse<PaginationResponse<IUserReadDto>>>({
            url: "/users/searchByRole",
            method: "POST",
            data: command,
          })
          .then((res) => {
            resolve(res.data.data);
          });
      });

  const handleSelectUser = (user: IUserReadDto) => {
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
