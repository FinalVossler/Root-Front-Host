import React from "react";
import { Socket } from "socket.io-client";
import { socketConnect } from "socket.io-react";

import NotificationMessageEnum from "../../globalTypes/NotificationMessagesEnum";
import { useAppDispatch } from "../../store/hooks";
import {
  INotification,
  notificationSlice,
} from "../../store/slices/notificationSlice";

interface IWithNotifications {
  socket: Socket;
}

const withNotifications = (Component: React.FunctionComponent<any>) =>
  socketConnect((props: IWithNotifications) => {
    const dispatch = useAppDispatch();
    const notificationsListener = React.useRef<any>(null);

    // Listening to incoming messages
    React.useEffect(() => {
      if (!props.socket.on) return;

      if (notificationsListener.current === null) {
        notificationsListener.current = props.socket.on(
          NotificationMessageEnum.Receive,
          (notification: INotification) => {
            dispatch(
              notificationSlice.actions.addNotification({ notification })
            );
          }
        );
      }
    }, [props.socket.on]);

    return <Component {...props} />;
  });

export default withNotifications;
