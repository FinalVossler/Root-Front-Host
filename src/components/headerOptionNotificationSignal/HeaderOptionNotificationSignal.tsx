import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./headerOptionNotificationSignal.styles";

interface IHeaderOptionNotificationSignal {
  numberOfNotifications?: number;
}

const HeaderOptionNotificationSignal: React.FunctionComponent<IHeaderOptionNotificationSignal> =
  (props: IHeaderOptionNotificationSignal) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );

    const styles = useStyles({ theme });

    if (!Boolean(props.numberOfNotifications)) return null;

    return (
      <div className={styles.notificationSignalContainer}>
        {Boolean(props.numberOfNotifications) && (
          <span className={styles.numberOfNotifications}>
            {props.numberOfNotifications}
          </span>
        )}
      </div>
    );
  };

export default React.memo(HeaderOptionNotificationSignal);
