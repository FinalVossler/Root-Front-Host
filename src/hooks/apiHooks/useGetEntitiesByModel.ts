import { AxiosResponse } from "axios";
import React from "react";

import PaginationCommand from "../../globalTypes/PaginationCommand";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { entitySlice, IEntity } from "../../store/slices/entitySlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type EntitiesGetCommand = {
  modelId: string;
  paginationCommand: PaginationCommand;
};

const useGetEntitiesByModel = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getEntitiesByModel = (command: EntitiesGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IEntity>>>({
          method: "POST",
          url: "/entities/getEntitiesByModel",
          data: command,
        })
        .then((res) => {
          dispatch(
            entitySlice.actions.setModelEntities({
              modelId: command.modelId,
              entities: res.data.data.data,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getEntitiesByModel, loading };
};

export default useGetEntitiesByModel;
