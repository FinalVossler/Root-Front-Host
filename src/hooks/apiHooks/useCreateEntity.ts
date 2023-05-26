import { AxiosResponse } from "axios";
import React from "react";
import IFile from "../../globalTypes/IFile";

import { useAppDispatch } from "../../store/hooks";
import { entitySlice, IEntity } from "../../store/slices/entitySlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type EntityFieldValueCommand = {
  fieldId: string;
  value: string;
  files: IFile[];
};

export type EntityCreateCommand = {
  modelId: string;
  entityFieldValues: EntityFieldValueCommand[];
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
            entitySlice.actions.addEntity({ entity, modelId: command.modelId })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createEntity, loading };
};

export default useCreateEntity;
