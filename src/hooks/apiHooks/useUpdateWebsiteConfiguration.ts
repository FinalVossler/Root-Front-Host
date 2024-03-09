import axios, { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { websiteConfigurationSlice } from "../../store/slices/websiteConfigurationSlice";
import {
  IWebsiteConfigurationReadDto,
  IWebsiteConfigurationUpdateCommand,
} from "roottypes";

const useUpdateWebsiteConfiguration = () => {
  // Don't use the useAuthorized axios here (for whatever reasons, weird things are going on and making it send the wrong update data)
  const token: string = useAppSelector(
    (state) => state.user.tokenInformation.value
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const updateWebsiteConfiguration = (
    command: IWebsiteConfigurationUpdateCommand
  ) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<IWebsiteConfigurationReadDto>>({
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: process.env.REACT_APP_BACKEND_URL + "/websiteConfigurations/",
          method: "PUT",
          data: command,
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          dispatch(
            websiteConfigurationSlice.actions.setConfiguration(
              res.data.data as IWebsiteConfigurationReadDto
            )
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
