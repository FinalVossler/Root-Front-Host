import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IUser, userSlice } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/hooks";

export type UsersSearchCommand = {
  firstNameOrLastNameOrEmail: string;
  paginationCommand: PaginationCommand;
};

const useSearchUsers = (
  { setStoreAfterSearch }: { setStoreAfterSearch: boolean } = {
    setStoreAfterSearch: true,
  }
) => {
  const [selectedUsers, setSelectedUsers] = React.useState<IUser[]>([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchUsersPromise = (
    firstNameOrLastNameOrEmail: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IUser>>((resolve, _) => {
      const command: UsersSearchCommand = {
        paginationCommand: paginationCommand,
        firstNameOrLastNameOrEmail,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IUser>>>({
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
