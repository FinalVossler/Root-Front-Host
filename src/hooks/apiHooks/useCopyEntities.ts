import React from "react";
import { IEntityReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useCopyEntities = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const copyEntities = (modelId: string, entitiesIds: string[]) =>
    new Promise<IEntityReadDto[]>(async (resolve, reject) => {
      setLoading(true);
      try {
        const entities: IEntityReadDto[] = await axios.request({
          url: "/entities/copy",
          method: "POST",
          data: {
            entitiesIds: entitiesIds,
            modelId,
          },
        });

        resolve(entities);
      } catch (e) {
        reject(e);
      }

      setLoading(false);
    });

  return { copyEntities, loading };
};

export default useCopyEntities;
