import React from "react";
import { AxiosResponse } from "axios";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { userSlice } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { IPaginationCommand, IUserReadDto } from "roottypes";

export type UsersSearchCommand = {
  firstNameOrLastNameOrEmail: string;
  paginationCommand: IPaginationCommand;
};

const useSearchUsers = (
  { setStoreAfterSearch }: { setStoreAfterSearch: boolean } = {
    setStoreAfterSearch: true,
  }
) => {
  const [selectedUsers, setSelectedUsers] = React.useState<IUserReadDto[]>([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchUsersPromise = (
    firstNameOrLastNameOrEmail: string,
    paginationCommand: IPaginationCommand
  ) =>
    new Promise<PaginationResponse<IUserReadDto>>((resolve, _) => {
      const command: UsersSearchCommand = {
        paginationCommand: paginationCommand,
        firstNameOrLastNameOrEmail,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IUserReadDto>>>({
          url: "/users/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          if (setStoreAfterSearch) {
            dispatch(userSlice.actions.setSearchedUsers(res.data.data));
          }
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
    handleSearchUsersPromise,
  };
};

export default useSearchUsers;
