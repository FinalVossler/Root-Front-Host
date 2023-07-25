import { AxiosResponse } from "axios";
import React from "react";
import PaginationCommand from "../../globalTypes/PaginationCommand";

import PaginationResponse from "../../globalTypes/PaginationResponse";
import { useAppDispatch } from "../../store/hooks";

import useAuthorizedAxios from "../useAuthorizedAxios";
import {
  IMicroFrontend,
  microFrontendSlice,
} from "../../store/slices/microFrontendSlice";

export type MicroFrontendsGetCommand = {
  paginationCommand: PaginationCommand;
};

const useGetMicroFrontends = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getMicroFrontends = (command: MicroFrontendsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<PaginationResponse<IMicroFrontend>>>({
          method: "POST",
          url: "/microFrontends/getMicroFrontends",
          data: command,
        })
        .then((res) => {
          dispatch(
            microFrontendSlice.actions.setMicroFrontends({
              microFrontends: res.data.data.data,
              total: res.data.data.total,
            })
          );
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getMicroFrontends: getMicroFrontends, loading };
};

export default useGetMicroFrontends;
