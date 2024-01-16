import React from "react";
import { AxiosResponse } from "axios";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { roleSlice } from "../../store/slices/roleSlice";
import { useAppDispatch } from "../../store/hooks";
import { IPaginationCommand, IRoleReadDto } from "roottypes";

export type RolesSearchCommand = {
  name: string;
  paginationCommand: IPaginationCommand;
};

const useSearchRoles = (
  { setStoreAfterSearch }: { setStoreAfterSearch: boolean } = {
    setStoreAfterSearch: true,
  }
) => {
  const [selectedRoles, setSelectedRoles] = React.useState<IRoleReadDto[]>([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchRolesPromise = (
    name: string,
    paginationCommand: IPaginationCommand
  ) =>
    new Promise<PaginationResponse<IRoleReadDto>>((resolve, _) => {
      const command: RolesSearchCommand = {
        paginationCommand: paginationCommand,
        name,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IRoleReadDto>>>({
          url: "/roles/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          if (setStoreAfterSearch) {
            dispatch(roleSlice.actions.setSearchedRoles(res.data.data));
          }
        });
    });

  const handleSelectRole = (role: IRoleReadDto) => {
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
