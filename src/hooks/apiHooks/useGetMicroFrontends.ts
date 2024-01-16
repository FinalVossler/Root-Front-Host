import { AxiosResponse } from "axios";
import React from "react";

import { useAppDispatch } from "../../store/hooks";

import useAuthorizedAxios from "../useAuthorizedAxios";
import { microFrontendSlice } from "../../store/slices/microFrontendSlice";
import {
  IMicroFrontendReadDto,
  IMicroFrontendsGetCommand,
  IPaginationResponse,
} from "roottypes";

const useGetMicroFrontends = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const getMicroFrontends = (command: IMicroFrontendsGetCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IPaginationResponse<IMicroFrontendReadDto>>>({
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
