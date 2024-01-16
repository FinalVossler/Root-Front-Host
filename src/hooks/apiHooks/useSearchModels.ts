import React from "react";
import { AxiosResponse } from "axios";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { modelSlice } from "../../store/slices/modelSlice";
import { useAppDispatch } from "../../store/hooks";
import {
  IModelReadDto,
  IModelsSearchCommand,
  IPaginationCommand,
} from "roottypes";

const useSearchModels = () => {
  const [selectedModels, setSelectedModels] = React.useState<IModelReadDto[]>(
    []
  );

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchModelsPromise = (
    name: string,
    paginationCommand: IPaginationCommand
  ) =>
    new Promise<PaginationResponse<IModelReadDto>>((resolve, _) => {
      const command: IModelsSearchCommand = {
        paginationCommand: paginationCommand,
        name,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IModelReadDto>>>({
          url: "/models/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(modelSlice.actions.setSearchedModels(res.data.data));
        });
    });

  const handleSelectedModel = (model: IModelReadDto) => {
    setSelectedModels([{ ...model }, ...selectedModels]);
  };

  const handleRemoveSelectedModel = (index: number) => {
    let newSelectedModels = [...selectedModels];
    newSelectedModels.splice(index, 1);
    setSelectedModels(newSelectedModels);
  };

  return {
    handleSelectedModel,
    handleRemoveSelectedModel,
    selectedModels,
    setSelectedModels,
    handleSearchModelsPromise,
  };
};

export default useSearchModels;
