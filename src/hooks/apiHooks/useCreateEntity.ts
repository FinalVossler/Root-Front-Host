import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { entitySlice } from "../../store/slices/entitySlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IEntityCreateCommand, IEntityReadDto } from "roottypes";

const useCreateEntity = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createEntity = (command: IEntityCreateCommand) =>
    new Promise<IEntityReadDto>(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IEntityReadDto>>({
          url: "/entities",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const entity: IEntityReadDto = res.data.data;
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
