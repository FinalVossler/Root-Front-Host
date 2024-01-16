import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import { microFrontendSlice } from "../../store/slices/microFrontendSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IMicroFrontendReadDto, IMicroFrontendUpdateCommand } from "roottypes";

const useUpdateMicroFrontend = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateMicroFrontend = (command: IMicroFrontendUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IMicroFrontendReadDto>>({
          url: "/microFrontends",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const microFrontend: IMicroFrontendReadDto = res.data.data;
          dispatch(
            microFrontendSlice.actions.updateMicroFrontend(microFrontend)
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateMicroFrontend, loading };
};

export default useUpdateMicroFrontend;
