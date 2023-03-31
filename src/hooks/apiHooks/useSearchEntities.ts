import React from "react";
import { AxiosResponse } from "axios";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IEntity } from "../../store/slices/entitySlice";

export type EntitiesSearchCommand = {
  name: string;
  modelId: string;
  paginationCommand: PaginationCommand;
};

const useSearchEntities = () => {
  const [selectedEntities, setSelectedEntities] = React.useState<IEntity[]>([]);

  const axios = useAuthorizedAxios();

  const handleSearchEntitiesPromise = (
    name: string,
    paginationCommand: PaginationCommand,
    modelId: string
  ) =>
    new Promise<PaginationResponse<IEntity>>((resolve, _) => {
      const command: EntitiesSearchCommand = {
        paginationCommand: paginationCommand,
        name,
        modelId,
      };

      axios
        .request<AxiosResponse<PaginationResponse<IEntity>>>({
          url: "/entities/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
        });
    });

  const handleSelectEntity = (entity: IEntity) => {
    setSelectedEntities([{ ...entity }, ...selectedEntities]);
  };

  const handleRemoveSelectedEntity = (index: number) => {
    let newSelectedEntities = [...selectedEntities];
    newSelectedEntities.splice(index, 1);
    setSelectedEntities(newSelectedEntities);
  };

  return {
    handleSelectEntity,
    handleRemoveSelectedEntity,
    selectedEntities,
    setSelectedEntities,
    handleSearchEntitiesPromise,
  };
};

export default useSearchEntities;
