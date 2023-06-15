import React from "react";
import { AxiosResponse } from "axios";

import { useAppDispatch } from "../../store/hooks";
import {
  IModel,
  ModelFieldConditionTypeEnum,
  modelSlice,
} from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IEvent } from "../../globalTypes/IEvent";

export type ModelUpdateCommand = {
  _id: string;
  name: string;
  modelFields: {
    fieldId: string;
    required: boolean;
    conditions?: {
      fieldId: string;
      conditionType: ModelFieldConditionTypeEnum;
      value: number | string;
    }[];
  }[];
  modelEvents: IEvent[];
  states: string[];
  subStates: string[];

  language: string;
};

const useUpdateModel = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateModel = (command: ModelUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IModel>>({
          url: "/models",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const model: IModel = res.data.data;
          dispatch(modelSlice.actions.updateModel(model));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateModel, loading };
};

export default useUpdateModel;
