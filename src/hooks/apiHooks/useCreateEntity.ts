import { AxiosResponse } from "axios";
import React from "react";
import IFile from "../../globalTypes/IFile";

import { useAppDispatch } from "../../store/hooks";
import { entitySlice, IEntity } from "../../store/slices/entitySlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type IEntityTableFieldCaseValueCommand = {
  columnId: string;
  rowId: string;
  value: string;
};

export type IEntityYearTableFieldRowValuesCommand = {
  rowId: string;
  values: {
    year: number;
    value: string;
  }[];
};

export type EntityFieldValueCommand = {
  fieldId: string;
  value: string;
  files: IFile[];

  tableValues: IEntityTableFieldCaseValueCommand[];
  yearTableValues: IEntityYearTableFieldRowValuesCommand[];
};

export type EntityCreateCommand = {
  modelId: string;
  entityFieldValues: EntityFieldValueCommand[];
  assignedUsersIds: string[];
  language: string;
};

const useCreateEntity = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createEntity = (command: EntityCreateCommand) =>
    new Promise<IEntity>(async (resolve, reject) => {
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
          resolve(entity);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createEntity, loading };
};

export default useCreateEntity;
