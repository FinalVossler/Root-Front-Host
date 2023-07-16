import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IModel, modelSlice } from "../../store/slices/modelSlice";
import { useAppDispatch } from "../../store/hooks";

export type ModelsSearchCommand = {
  name: string;
  paginationCommand: PaginationCommand;
};

const useSearchModels = () => {
  const [selectedModels, setSelectedModels] = React.useState<IModel[]>([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchModelsPromise = (
    name: string,
    paginationCommand: PaginationCommand
  ) =>
    new Promise<PaginationResponse<IModel>>((resolve, _) => {
      const command: ModelsSearchCommand = {
        paginationCommand: paginationCommand,
        name,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IModel>>>({
          url: "/models/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(modelSlice.actions.setSearchedModels(res.data.data));
        });
    });

  const handleSelectedModel = (model: IModel) => {
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
