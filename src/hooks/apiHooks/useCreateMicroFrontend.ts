import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";
import {
  microFrontendSlice,
  IMicroFrontend,
} from "../../store/slices/microFrontendSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

type MicroFrontendComponentCreateCommand = {
  name: string;
};

export type MicroFrontendCreateCommand = {
  name: string;
  remoteEntry: string;
  components: MicroFrontendComponentCreateCommand[];
};

const useCreateMicroFrontend = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createMicroFrontend = (command: MicroFrontendCreateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IMicroFrontend>>({
          url: "/microFrontends",
          method: "POST",
          data: command,
        })
        .then((res) => {
          const microFrontend: IMicroFrontend = res.data.data;
          dispatch(microFrontendSlice.actions.addMicroFrontend(microFrontend));
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { createMicroFrontend, loading };
};

export default useCreateMicroFrontend;
