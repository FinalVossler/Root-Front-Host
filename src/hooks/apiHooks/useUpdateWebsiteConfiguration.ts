import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { Theme } from "../../config/theme";
import { useAppDispatch } from "../../store/hooks";
import { websiteConfigurationSlice } from "../../store/slices/websiteConfigurationSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type WebsiteConfigurationUpdateCommand = {
  title: string;
  email: string;
  phoneNumber: string;
  tabTitle: string;
  mainLanguages: string[];
  withChat: boolean;
  withRegistration: boolean;
  theme: Theme;
};

const useUpdateWebsiteConfiguration = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const updateWebsiteConfiguration = (
    command: WebsiteConfigurationUpdateCommand
  ) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<WebsiteConfigurationUpdateCommand>>({
          url:
            process.env.REACT_APP_BACKEND_URL + "/websiteConfigurations/update",
          method: "POST",
          data: command,
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
