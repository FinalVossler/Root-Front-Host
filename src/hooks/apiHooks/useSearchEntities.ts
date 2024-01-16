import React from "react";
import { AxiosResponse } from "axios";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { entitySlice } from "../../store/slices/entitySlice";
import { useAppDispatch } from "../../store/hooks";
import {
  IEntitiesSearchCommand,
  IEntityReadDto,
  IPaginationCommand,
  IPaginationResponse,
} from "roottypes";

const useSearchEntities = () => {
  const [selectedEntities, setSelectedEntities] = React.useState<
    IEntityReadDto[]
  >([]);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const handleSearchEntitiesPromise = (
    name: string,
    paginationCommand: IPaginationCommand,
    modelId: string
  ) =>
    new Promise<IPaginationResponse<IEntityReadDto>>((resolve, _) => {
      const command: IEntitiesSearchCommand = {
        paginationCommand: paginationCommand,
        name,
        modelId,
      };

      axios
        .request<AxiosResponse<IPaginationResponse<IEntityReadDto>>>({
          url: "/entities/search",
          method: "POST",
          data: command,
        })
        .then((res) => {
          resolve(res.data.data);
          dispatch(
            entitySlice.actions.setSearchedEntities({
              searchResult: res.data.data,
              modelId: modelId,
            })
          );
        });
    });

  const handleSelectEntity = (entity: IEntityReadDto) => {
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
