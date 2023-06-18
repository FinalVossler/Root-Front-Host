import { AxiosResponse } from "axios";
import React from "react";

import { IEvent } from "../../globalTypes/IEvent";

import { useAppDispatch } from "../../store/hooks";
import {
  modelSlice,
  IModel,
  ModelFieldConditionTypeEnum,
  ModelStateType,
} from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

type ModelStateCreateCommand = {
  name: string;
  stateType: ModelStateType;
  exclusive: boolean;
  language: string;
};

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
    modelStatesIds: string[];
    mainField: boolean;
  }[];
  modelEvents: IEvent[];
  states: ModelStateCreateCommand[];
  subStates: ModelStateCreateCommand[];

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
