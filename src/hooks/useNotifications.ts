import React from "react";

import { useAppSelector } from "../store/hooks";

const useNotifications = () => {
  const userId: string = useAppSelector((state) => state.user.user._id);
  const totalUnclickedNotifications: number = useAppSelector(
    (state) => state.notification.totalUnclicked
  );
  const totalUnreadMessages: number = useAppSelector(
    (state) => state.chat.totalUnreadMessages
  );

  const numberOfNotifications: number = React.useMemo(
    () => totalUnreadMessages + totalUnclickedNotifications,
    [userId, totalUnreadMessages, totalUnclickedNotifications]
  );

  React.useEffect(() => {
    const splittedCurrentTitle = document.title.split(" ");
    if (
      document.title.indexOf("(") !== -1 &&
      document.title.indexOf(")") !== -1
    ) {
      splittedCurrentTitle.shift();
    }

    document.title =
      (numberOfNotifications > 0 ? "(" + numberOfNotifications + ") " : "") +
      splittedCurrentTitle.join(" ");
  }, [numberOfNotifications]);

  return numberOfNotifications;
};

export default useNotifications;
