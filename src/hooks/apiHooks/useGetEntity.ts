import { AxiosResponse } from "axios";
import React from "react";

import { IEntity } from "../../store/slices/entitySlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type EntitiesGetEntityCommand = {
  entityId: string;
  modelId: string;
};

const useGetEntity = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getEntity = (command: EntitiesGetEntityCommand) =>
    new Promise<IEntity>((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IEntity>>({
          method: "GET",
          url: "/entities/getEntity",
          params: command,
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getEntity, loading };
};

export default useGetEntity;
