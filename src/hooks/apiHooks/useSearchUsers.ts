import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUser } from "../../store/slices/userSlice";

export type UsersSearchCommand = {
  firstNameOrLastName: string;
  paginationCommand: PaginationCommand;
};

const useSearchUsers = () => {
  const [selectedUsers, setSelectedUsers] = React.useState<IUser[]>([]);

  const axios = useAuthorizedAxios();

  const handleSearchUsersPromise = (
    firstNameOrLastName: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IUser>>((resolve, _) => {
      const command: UsersSearchCommand = {
        paginationCommand: paginationCommand,
        firstNameOrLastName,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IUser>>>({
          url: "/users/search",
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
    handleSearchUsersPromise,
  };
};

export default useSearchUsers;
