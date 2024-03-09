import { AxiosResponse } from "axios";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { userPreferenceSlice } from "../../store/slices/userPreferencesSlice";
import { websiteConfigurationSlice } from "../../store/slices/websiteConfigurationSlice";

import useAxios from "../useAxios";
import { IWebsiteConfigurationReadDto } from "roottypes";

const useGetWebsiteConfiguration = () => {
  const [loading, setLoading] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const axios = useAxios();
  const dispatch = useAppDispatch();

  const getWebsiteConfiguration = () =>
    new Promise((resolve, reject) => {
      axios
        .request<AxiosResponse<IWebsiteConfigurationReadDto>>({
          method: "GET",
          url: "/websiteConfigurations/",
        })
        .then((res) => {
          // Set the configuration
          dispatch(
            websiteConfigurationSlice.actions.setConfiguration(res.data.data)
          );
          // Set the default language
          dispatch(
            userPreferenceSlice.actions.setLanguage(
              res.data.data.mainLanguages?.length
                ? res.data.data.mainLanguages[0]
                : "en"
            )
          );
        })
        .finally(() => {
          setLoading(true);
          setFinished(true);
        });
    });

  return { getWebsiteConfiguration, loading, finished };
};

export default useGetWebsiteConfiguration;
