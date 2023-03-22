import { AxiosResponse } from "axios";
import React from "react";
import { IModelFieldForm } from "../../components/editors/modelEditor/ModelEditor";

import { useAppDispatch } from "../../store/hooks";
import { modelSlice, IModel } from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type ModelCreateCommand = {
  name: string;
  modelFields: IModelFieldForm[];
  language: string;
};

const useCreateModel = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createModel = (command: ModelCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IModel>>({
          url: "/models",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const model: IModel = res.data.data;
          dispatch(modelSlice.actions.addModel(model));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createModel, loading };
};

export default useCreateModel;
