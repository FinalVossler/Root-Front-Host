import React from "react";
import { BsChatDots } from "react-icons/bs";
import { createPortal } from "react-dom";

import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import useStyles from "./headerInbox.styles";
import { chatSlice } from "../../../../store/slices/chatSlice";
import ChatBoxes from "../chatBoxes";
import { useLocation } from "react-router-dom";
import useGetUserTotalUnreadMessages from "../../../../hooks/apiHooks/useGetUserTotalUnreadMessages";
import LastConversationsLastMessages from "../lastConversationsLastMessages";
import { ITheme } from "roottypes";

interface IHeaderInboxProps {}

const HeaderInbox: React.FunctionComponent<IHeaderInboxProps> = (
  props: IHeaderInboxProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const totalUnreadMessages: number = useAppSelector(
    (state) => state.chat.totalUnreadMessages
  );
  const [inboxOpen, setInboxOpen] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const inboxRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(inboxRef, () => {
    setInboxOpen(false);
  });

  const { getUserTotalUnreadMessages } = useGetUserTotalUnreadMessages();

  React.useEffect(() => {
    // Empty selected conversations when this component is unmounted
    return () => {
      dispatch(chatSlice.actions.unselectAllConversations());
    };
  }, []);

  // Get total unread messages
  React.useEffect(() => {
    getUserTotalUnreadMessages();
  }, []);

  const handleOpenInbox = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === inboxRef.current) {
      setInboxOpen(true);
    }
    e.stopPropagation();
  };

  const handleSelectConversation = (conversationId: string) => {
    dispatch(chatSlice.actions.addSelectedConversation({ conversationId }));
    setInboxOpen(false);
  };

  return (
    <div
      className={styles.headerInboxContainer}
      ref={inboxRef as React.RefObject<HTMLDivElement>}
      onClick={handleOpenInbox}
      {...props}
    >
      <BsChatDots className={styles.inboxIcon} />

      {totalUnreadMessages > 0 && (
        <span className={styles.notificationNumber}>{totalUnreadMessages}</span>
      )}

      {inboxOpen && (
        <div className={styles.inboxPopup}>
          <LastConversationsLastMessages
            onSelectConversation={handleSelectConversation}
          />
        </div>
      )}

      {pathname != "/chat" && createPortal(<ChatBoxes />, document.body)}
    </div>
  );
};

export default HeaderInbox;
