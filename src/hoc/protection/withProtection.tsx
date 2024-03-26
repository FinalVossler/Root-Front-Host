import React from "react";

import { LOCAL_STORAGE_TOKEN_ITEM_NAME } from "../../config/constants";
import Unauthorized from "../../components/fundamentalComponents/unauthorized";
import { useAppSelector } from "../../store/hooks";

const withProtection =
  (Component: any): React.FunctionComponent<any> =>
  (props: any) => {
    const theme = useAppSelector((state) => state.websiteConfiguration.theme);

    const isConnected: boolean = Boolean(
      localStorage.getItem(LOCAL_STORAGE_TOKEN_ITEM_NAME)
    );

    if (isConnected) {
      return <Component {...props} />;
    } else {
      return <Unauthorized theme={theme} />;
    }
  };

export default withProtection;
