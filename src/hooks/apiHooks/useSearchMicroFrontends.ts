import React from "react";
import { AxiosResponse } from "axios";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { microFrontendSlice } from "../../store/slices/microFrontendSlice";
import { useAppDispatch } from "../../store/hooks";
import {
  IMicroFrontendReadDto,
  IMicroFrontendsSearchCommand,
  IPaginationCommand,
  IPaginationResponse,
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
    new Promise<IPaginationResponse<IMicroFrontendReadDto>>((resolve, _) => {
      const command: IMicroFrontendsSearchCommand = {
        name,
        paginationCommand: paginationCommand,
      };

      axios
        .request<AxiosResponse<IPaginationResponse<IMicroFrontendReadDto>>>({
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
