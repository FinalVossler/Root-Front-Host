import { AxiosResponse } from "axios";
import React from "react";
import { IEvent } from "../../globalTypes/IEvent";

import { useAppDispatch } from "../../store/hooks";
import {
  microFrontendSlice,
  IMicroFrontend,
} from "../../store/slices/microFrontendSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type MicroFrontendComponentUpdateCommand = {
  _id?: string;
  name: string;
};

export type MicroFrontendUpdateCommand = {
  _id: string;
  name: string;
  remoteEntry: string;
  components: MicroFrontendComponentUpdateCommand[];
};

const useUpdateMicroFrontend = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateMicroFrontend = (command: MicroFrontendUpdateCommand) =>
    new Promise(async (resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IMicroFrontend>>({
          url: "/microFrontends",
          method: "PUT",
          data: command,
        })
        .then((res) => {
          const microFrontend: IMicroFrontend = res.data.data;
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
