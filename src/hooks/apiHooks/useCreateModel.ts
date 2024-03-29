import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { modelSlice, IModelReadDto } from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IModelCreateCommand } from "roottypes";

const useCreateModel = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createModel = (command: IModelCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IModelReadDto>>({
          url: "/models",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const model: IModelReadDto = res.data.data;
          dispatch(modelSlice.actions.addModel(model));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createModel, loading };
};

export default useCreateModel;
