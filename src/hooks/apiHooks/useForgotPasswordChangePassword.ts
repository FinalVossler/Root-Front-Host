import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import useAxios from "../useAxios";
import useGetTranslatedText from "../useGetTranslatedText";

export type UserForgotPasswordChangePasswordCommand = {
  newPassword: string;
  token: string;
};

const useForgotPasswordChangePassword = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const axios = useAxios();
  const getTranslatedText = useGetTranslatedText();

  const forgotPasswordChangePassword = (
    command: UserForgotPasswordChangePasswordCommand
  ) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request({
          method: "POST",
          url: "/users/forgotPasswordChangePassword",
          data: command,
        })
        .then((res) => {
          toast.success(getTranslatedText(staticText?.passwordWasChanged));
          resolve(null);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => setLoading(false));
    });

  return {
    forgotPasswordChangePassword,
    loading,
  };
};

export default useForgotPasswordChangePassword;
