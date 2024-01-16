import React from "react";
import { AxiosResponse } from "axios";

import { useAppDispatch } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { entitySlice } from "../../store/slices/entitySlice";
import { toast } from "react-toastify";
import { IEntityReadDto, IEntityUpdateCommand } from "roottypes";

const useUpdateEntity = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateEntity = (command: IEntityUpdateCommand) =>
    new Promise<IEntityReadDto>(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IEntityReadDto>>({
          url: "/entities",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const entity: IEntityReadDto = res.data.data;
          dispatch(
            entitySlice.actions.updateEntity({
              modelId: command.modelId,
              entity,
            })
          );
          resolve(entity);
          toast.success("👌");
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => reject(e));
    });

  return { updateEntity, loading };
};

export default useUpdateEntity;
