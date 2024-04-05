import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { entitySlice } from "../../store/slices/entitySlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IEntityReadDto, IModelReadDto } from "roottypes";
import { toast } from "react-toastify";

const useGenerateVariations = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const generateVariations = (entityId: string) =>
    new Promise<void>(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IEntityReadDto[]>>({
          url: "/entities/generateVariations",
          method: "POST",
          data: { entityId },
        })
        .then((res) => {
          const entities: IEntityReadDto[] = res.data.data;
          entities.forEach((entity) => {
            dispatch(
              entitySlice.actions.addEntity({
                entity,
                modelId: (entity.model as IModelReadDto)._id.toString(),
              })
            );
          });
          toast.success("👌");
          resolve();
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { generateVariations, loading };
};

export default useGenerateVariations;
