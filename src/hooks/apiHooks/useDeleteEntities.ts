import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { entitySlice } from "../../store/slices/entitySlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useDeleteEntities = (modelId: string) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteEntities = (entitiesIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/entities",
          data: entitiesIds,
        })
        .then((res) => {
          dispatch(
            entitySlice.actions.deleteEntities({ modelId, entitiesIds })
          );
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteEntities, loading };
};

export default useDeleteEntities;
