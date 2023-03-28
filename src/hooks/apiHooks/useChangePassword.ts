import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import useAuthorizedAxios from "../useAuthorizedAxios";
import useAxios from "../useAxios";
import useGetTranslatedText from "../useGetTranslatedText";

export type UserChangePasswordCommand = {
  oldPassword: string;
  newPassword: string;
};

const useForgotPasswordChangePassword = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const axios = useAuthorizedAxios();
  const getTranslatedText = useGetTranslatedText();

  const changePassword = (command: UserChangePasswordCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request({
          method: "POST",
          url: "/users/changePassword",
          data: command,
        })
        .then((_) => {
          toast.success(getTranslatedText(staticText?.passwordWasChanged));
          resolve(null);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => setLoading(false));
    });

  return {
    changePassword,
    loading,
  };
};

export default useForgotPasswordChangePassword;
