import React from "react";
import { AxiosResponse } from "axios";

import { useAppDispatch } from "../../store/hooks";
import { modelSlice } from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IModelReadDto, IModelUpdateCommand } from "roottypes";

const useUpdateModel = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateModel = (command: IModelUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IModelReadDto>>({
          url: "/models",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const model: IModelReadDto = res.data.data;
          dispatch(modelSlice.actions.updateModel(model));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateModel, loading };
};

export default useUpdateModel;
