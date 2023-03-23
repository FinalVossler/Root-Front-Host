import React from "react";
import { AxiosResponse } from "axios";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { entitySlice, IEntity } from "../../store/slices/entitySlice";

export type EntityUpdateCommand = {
  _id: string;
  model: string;
  entityFieldValues: {
    field: string;
    value: string;
  }[];
  language: string;
};

const useUpdateEntity = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateEntity = (command: EntityUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IEntity>>({
          url: "/entities",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const entity: IEntity = res.data.data;
          dispatch(
            entitySlice.actions.updateEntity({ modelId: command.model, entity })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateEntity, loading };
};

export default useUpdateEntity;
