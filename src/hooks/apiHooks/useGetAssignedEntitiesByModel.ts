import { AxiosResponse } from "axios";
import React from "react";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { entitySlice, IEntity } from "../../store/slices/entitySlice";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { EntitiesGetCommand } from "./useGetEntitiesByModel";

const useGetAssignedEntitiesByModel = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getAssignedEntitiesByModel = (command: EntitiesGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IEntity>>>({
          method: "POST",
          url: "/entities/getAssignedEntitiesByModel",
          data: command,
        })
        .then((res) => {
          dispatch(
            entitySlice.actions.setAssignedEntitiesByModel({
              entities: res.data.data.data,
              total: res.data.data.total,
              modelId: command.modelId,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getAssignedEntitiesByModel, loading };
};

export default useGetAssignedEntitiesByModel;
