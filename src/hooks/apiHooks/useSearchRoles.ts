import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IRole, roleSlice } from "../../store/slices/roleSlice";
import { useAppDispatch } from "../../store/hooks";

export type RolesSearchCommand = {
  name: string;
  paginationCommand: PaginationCommand;
};

const useSearchRoles = () => {
  const [selectedRoles, setSelectedRoles] = React.useState<IRole[]>([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchRolesPromise = (
    name: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IRole>>((resolve, _) => {
      const command: RolesSearchCommand = {
        paginationCommand: paginationCommand,
        name,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IRole>>>({
          url: "/roles/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(roleSlice.actions.setSearchedRoles(res.data.data));
        });
    });

  const handleSelectRole = (role: IRole) => {
    setSelectedRoles([{ ...role }, ...selectedRoles]);
  };

  const handleRemoveSelectedRole = (index: number) => {
    let newSelectedRoles = [...selectedRoles];
    newSelectedRoles.splice(index, 1);
    setSelectedRoles(newSelectedRoles);
  };

  return {
    handleSelectRole,
    handleRemoveSelectedRole,
    selectedRoles,
    setSelectedRoles,
    handleSearchRolesPromise,
  };
};

export default useSearchRoles;
