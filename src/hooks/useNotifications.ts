import React from "react";

import { useAppSelector } from "../store/hooks";
import { Conversation } from "../store/slices/chatSlice";

const useNotifications = () => {
  const userId: string = useAppSelector((state) => state.user.user._id);
  const conversations: Conversation[] = useAppSelector(
    (state) => state.chat.conversations
  );
  const totalUnclickedNotifications: number = useAppSelector(
    (state) => state.notification.totalUnclicked
  );

  const numberOfNotifications: number = React.useMemo(
    () =>
      conversations.reduce(
        (acc, conversation) => acc + conversation.totalUnreadMessages,
        0
      ) + totalUnclickedNotifications,
    [userId, conversations, totalUnclickedNotifications]
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
