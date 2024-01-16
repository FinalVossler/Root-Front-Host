import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import {
  microFrontendSlice,
  IMicroFrontendReadDto,
} from "../../store/slices/microFrontendSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IMicroFrontendCreateCommand } from "roottypes";

const useCreateMicroFrontend = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createMicroFrontend = (command: IMicroFrontendCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IMicroFrontendReadDto>>({
          url: "/microFrontends",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const microFrontend: IMicroFrontendReadDto = res.data.data;
          dispatch(microFrontendSlice.actions.addMicroFrontend(microFrontend));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createMicroFrontend, loading };
};

export default useCreateMicroFrontend;
