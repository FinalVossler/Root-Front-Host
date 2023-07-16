import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { useAppSelector } from "../../store/hooks";

import useAxios from "../useAxios";
import useGetTranslatedText from "../useGetTranslatedText";

const useSendChangePasswordRequest = () => {
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAxios();
  const getTranslatedText = useGetTranslatedText();

  const sendChangePasswordRequest = (email: string) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<void>>({
          url: "/users/sendChangePasswordRequest",
          method: "POST",
          data: { email },
        })
        .then((res) => {
          resolve(res);
          toast.success(
            getTranslatedText(staticText?.changePasswordRequestHasBeenSent)
          );
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => setLoading(false));
    });

  return { sendChangePasswordRequest, loading };
};

export default useSendChangePasswordRequest;
