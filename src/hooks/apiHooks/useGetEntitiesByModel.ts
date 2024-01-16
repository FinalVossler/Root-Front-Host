import { AxiosResponse } from "axios";
import React from "react";
import {
  IEntitiesGetCommand,
  IEntityReadDto,
  IPaginationResponse,
} from "roottypes";

import { useAppDispatch } from "../../store/hooks";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { entitySlice } from "../../store/slices/entitySlice";

const useGetEntitiesByModel = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getEntitiesByModel = (command: IEntitiesGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IPaginationResponse<IEntityReadDto>>>({
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
