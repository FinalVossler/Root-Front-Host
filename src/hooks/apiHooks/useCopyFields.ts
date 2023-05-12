import React from "react";

import { IField } from "../../store/slices/fieldSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useCopyFields = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const copyFields = (ids: string[]) =>
    new Promise<IField[]>(async (resolve, reject) => {
      setLoading(true);
      try {
        const fields: IField[] = await axios.request({
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
