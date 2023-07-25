import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { microFrontendSlice } from "../../store/slices/microFrontendSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

const useDeleteMicroFrontends = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const deleteMicroFrontends = (microFrontendsIds: string[]) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "DELETE",
          url: "/microFrontends",
          data: microFrontendsIds,
        })
        .then((res) => {
          dispatch(
            microFrontendSlice.actions.deleteMicroFrontends(microFrontendsIds)
          );
          resolve(res);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { deleteMicroFrontends, loading };
};

export default useDeleteMicroFrontends;
