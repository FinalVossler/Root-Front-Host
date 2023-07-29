import { AxiosResponse } from "axios";
import React from "react";

import useAxios from "../useAxios";
import { IMicroFrontend } from "../../store/slices/microFrontendSlice";

const useGetMicroFrontend = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAxios();

  const getMicroFrontend = (microFrontendId: string) =>
    new Promise<IMicroFrontend>((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IMicroFrontend>>({
          method: "GET",
          url: "/microFrontends/getById",
          params: {
            microFrontendId,
          },
        })
        .then((res) => {
          const microFrontend: IMicroFrontend = res.data.data;
          resolve(microFrontend);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { getMicroFrontend, loading };
};

export default useGetMicroFrontend;
