import axios, { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { Theme } from "../../config/theme";
import IFile from "../../globalTypes/IFile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { websiteConfigurationSlice } from "../../store/slices/websiteConfigurationSlice";

export type WebsiteConfigurationUpdateCommand = {
  title: string;
  email: string;
  phoneNumber: string;
  tabTitle: string;
  mainLanguages: string[];
  withChat: boolean;
  withRegistration: boolean;
  theme: Theme;
  tabIcon?: IFile;
};

const useUpdateWebsiteConfiguration = () => {
  const token: string = useAppSelector(
    (state) => state.user.tokenInformation.value
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const updateWebsiteConfiguration = (
    command: WebsiteConfigurationUpdateCommand
  ) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<WebsiteConfigurationUpdateCommand>>({
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url:
            process.env.REACT_APP_BACKEND_URL + "/websiteConfigurations/update",
          method: "POST",
          data: command,
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          dispatch(
            websiteConfigurationSlice.actions.setConfiguration(res.data.data)
          );
          toast.success("Configuration saved");
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e) => reject(e));
    });

  return { updateWebsiteConfiguration, loading };
};

export default useUpdateWebsiteConfiguration;
