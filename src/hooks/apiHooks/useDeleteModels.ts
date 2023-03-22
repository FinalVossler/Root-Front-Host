import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { modelSlice } from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useDeleteModels = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteModels = (modelsIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/models",
          data: modelsIds,
        })
        .then((res) => {
          dispatch(modelSlice.actions.deleteModels(modelsIds));
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteModels, loading };
};

export default useDeleteModels;
