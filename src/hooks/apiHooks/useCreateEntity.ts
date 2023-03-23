import { AxiosResponse } from "axios";
import React from "react";
import { IModelFieldForm } from "../../components/editors/modelEditor/ModelEditor";

import { useAppDispatch } from "../../store/hooks";
import { entitySlice, IEntity } from "../../store/slices/entitySlice";
import { modelSlice, IModel } from "../../store/slices/modelSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type EntityCreateCommand = {
  model: string;
  entityFieldValues: {
    field: string;
    value: string;
  }[];
  language: string;
};

const useCreateEntity = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createEntity = (command: EntityCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IEntity>>({
          url: "/entities",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const entity: IEntity = res.data.data;
          dispatch(
            entitySlice.actions.addEntity({ entity, modelId: command.model })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createEntity, loading };
};

export default useCreateEntity;
