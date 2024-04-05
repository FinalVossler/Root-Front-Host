import React from "react";
import { IModelReadDto } from "roottypes";

import useAuthorizedAxios from "../useAuthorizedAxios";

const useCopyModels = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const copyModels = (modelsIds: string[]) =>
    new Promise<IModelReadDto[]>(async (resolve, reject) => {
      setLoading(true);
      try {
        const models: IModelReadDto[] = await axios.request({
          url: "/models/copy",
          method: "POST",
          data: {
            modelsIds,
          },
        });

        resolve(models);
      } catch (e) {
        reject(e);
      }

      setLoading(false);
    });

  return { copyModels, loading };
};

export default useCopyModels;
