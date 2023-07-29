import { AxiosResponse } from "axios";
import React from "react";

import { IEntity } from "../../store/slices/entitySlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetEntity = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getEntity = (entityId: string) =>
    new Promise<IEntity>((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IEntity>>({
          method: "GET",
          url: "/entities/getEntity",
          params: { entityId },
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
