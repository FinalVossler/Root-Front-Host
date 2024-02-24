import React from "react";

import { LOCAL_STORAGE_TOKEN_ITEM_NAME } from "../../config/constants";
import Unauthorized from "../../components/fundamentalComponents/unauthorized";

const withProtection =
  (Component: any): React.FunctionComponent<any> =>
  (props: any) => {
    const isConnected: boolean = Boolean(
      localStorage.getItem(LOCAL_STORAGE_TOKEN_ITEM_NAME)
    );

    if (isConnected) {
      return <Component {...props} />;
    } else {
      return <Unauthorized />;
    }
  };

export default withProtection;
