import React from "react";
import { AxiosResponse } from "axios";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { microFrontendSlice } from "../../store/slices/microFrontendSlice";
import { useAppDispatch } from "../../store/hooks";
import {
  IMicroFrontendReadDto,
  IMicroFrontendsSearchCommand,
  IPaginationCommand,
} from "roottypes";

const useSearchMicroFrontends = () => {
  const [selectedMicroFrontends, setSelectedMicroFrontends] = React.useState<
    IMicroFrontendReadDto[]
  >([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchMicroFrontendsPromise = (
    name: string,
    paginationCommand: IPaginationCommand
  ) =>
    new Promise<PaginationResponse<IMicroFrontendReadDto>>((resolve, _) => {
      const command: IMicroFrontendsSearchCommand = {
        name,
        paginationCommand: paginationCommand,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IMicroFrontendReadDto>>>({
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

  const handleSelectMicroFrontend = (microFrontend: IMicroFrontendReadDto) => {
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

export default useSearchMicroFrontends;
