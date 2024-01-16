import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import useAxios from "../useAxios";
import useGetTranslatedText from "../useGetTranslatedText";
import { IUserForgotPasswordChangePasswordCommand } from "roottypes";

const useForgotPasswordChangePassword = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const axios = useAxios();
  const getTranslatedText = useGetTranslatedText();

  const forgotPasswordChangePassword = (
    command: IUserForgotPasswordChangePasswordCommand
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
