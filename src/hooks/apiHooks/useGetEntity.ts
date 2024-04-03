import { AxiosResponse } from "axios";
import React from "react";
import { IEntityReadDto, IOrderReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useGetEntity = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const getEntity = (entityId: string) =>
    new Promise<{
      entity: IEntityReadDto;
      concernedOrder: IOrderReadDto | undefined | null;
    }>((resolve, reject) => {
      setLoading(true);
      axios
        .request<
          AxiosResponse<{
            entity: IEntityReadDto;
            concernedOrder: IOrderReadDto | undefined | null;
          }>
        >({
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
