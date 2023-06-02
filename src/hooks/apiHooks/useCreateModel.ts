import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import {
  modelSlice,
  IModel,
  ModelFieldConditionTypeEnum,
  ModelEventTypeEnum,
  ModelEventTriggerEnum,
} from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type ModelCreateCommand = {
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
  modelEvents: {
    eventTrigger: ModelEventTriggerEnum;
    eventType: ModelEventTypeEnum;

    // Redirection options
    redirectionUrl: string;
    redirectionToSelf: boolean;

    // API call options
    requestMethod: string;
    requestUrl: string;
    requestDataIsCreatedEntity: boolean;
    requestData: string;
  }[];
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
