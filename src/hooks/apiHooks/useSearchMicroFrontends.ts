import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import {
  IMicroFrontend,
  microFrontendSlice,
} from "../../store/slices/microFrontendSlice";
import { useAppDispatch } from "../../store/hooks";

export type MicroFrontendsSearchCommand = {
  name: string;
  paginationCommand: PaginationCommand;
};

const useSearchUsers = () => {
  const [selectedMicroFrontends, setSelectedMicroFrontends] = React.useState<
    IMicroFrontend[]
  >([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchMicroFrontendsPromise = (
    name: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IMicroFrontend>>((resolve, _) => {
      const command: MicroFrontendsSearchCommand = {
        name,
        paginationCommand: paginationCommand,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IMicroFrontend>>>({
          url: "/microFrontends/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(
            microFrontendSlice.actions.setSearchedMicroFrontends(res.data.data)
          );
        });
    });

  const handleSelectMicroFrontend = (microFrontend: IMicroFrontend) => {
    setSelectedMicroFrontends([
      { ...microFrontend },
      ...selectedMicroFrontends,
    ]);
  };

  return {
    handleSelectMicroFrontend,
    selectedMicroFrontends,
    setSelectedMicroFrontends,
    handleSearchMicroFrontendsPromise,
  };
};

export default useSearchUsers;
