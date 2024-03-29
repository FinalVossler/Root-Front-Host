import React from "react";

import { useAppSelector } from "../../../store/hooks";

import useStyles from "./headerOptionNotificationSignal.styles";
import { ITheme } from "roottypes";

interface IHeaderOptionNotificationSignalProps {
  numberOfNotifications?: number;
}

const HeaderOptionNotificationSignal: React.FunctionComponent<
  IHeaderOptionNotificationSignalProps
> = (props: IHeaderOptionNotificationSignalProps) => {
  const theme: ITheme = useAppSelector(
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
