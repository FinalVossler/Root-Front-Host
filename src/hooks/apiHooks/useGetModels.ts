import { AxiosResponse } from "axios";
import React from "react";
import PaginationCommand from "../../globalTypes/PaginationCommand";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";
import { IModel, modelSlice } from "../../store/slices/modelSlice";

import useAuthorizedAxios from "../useAuthorizedAxios";

export type ModelsGetCommand = {
  paginationCommand: PaginationCommand;
};

const useGetModels = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getModels = (command: ModelsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IModel>>>({
          method: "POST",
          url: "/models/getModels",
          data: command,
        })
        .then((res) => {
          dispatch(
            modelSlice.actions.setModels({
              models: res.data.data.data,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getModels: getModels, loading };
};

export default useGetModels;
