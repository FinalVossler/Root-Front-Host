import React from "react";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { IFieldReadDto } from "roottypes";

const useCopyFields = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const copyFields = (ids: string[]) =>
    new Promise<IFieldReadDto[]>(async (resolve, reject) => {
      setLoading(true);
      try {
        const fields: IFieldReadDto[] = await axios.request({
          url: "/fields/copy",
          method: "POST",
          data: {
            ids,
          },
        });

        resolve(fields);
      } catch (e) {
        reject(e);
      }

      setLoading(false);
    });

  return { copyFields, loading };
};

export default useCopyFields;
