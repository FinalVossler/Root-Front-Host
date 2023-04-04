import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";

import { Theme } from "../../config/theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAppSelector } from "../../store/hooks";
import useGetLastConversationsLastMessages from "../../hooks/apiHooks/useGetLastConversationsLastMessages";

import useStyles from "./headerInbox.styles";
import { IPopulatedMessage } from "../../store/slices/chatSlice";
import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";
import { IUser } from "../../store/slices/userSlice";

interface IHeaderInbox {}

const LIMIT = 20;

const HeaderInbox: React.FunctionComponent<IHeaderInbox> = (
  props: IHeaderInbox
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const lastConversationsLastMessages = useAppSelector(
    (state) => state.chat.lastConversationsLastMessages
  );
  const total = useAppSelector(
    (state) => state.chat.totalLastConversationsLastMessages
  );
  const user: IUser = useAppSelector((state) => state.user.user);

  const [inboxOpen, setInboxOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const inboxRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(inboxRef, () => {
    setInboxOpen(false);
  });

  const { getLastConversationsLastMessages } =
    useGetLastConversationsLastMessages();

  React.useEffect(() => {
    if (inboxOpen) {
      getLastConversationsLastMessages({
        paginationCommand: {
          limit: LIMIT,
          page,
        },
      });
    }
  }, [inboxOpen]);

  const handleOpenInbox = () => setInboxOpen(!inboxOpen);

  return (
    <div
      className={styles.headerInboxContainer}
      ref={inboxRef as React.RefObject<HTMLDivElement>}
      {...props}
    >
      <BsFillChatDotsFill
        onClick={handleOpenInbox}
        className={styles.inboxIcon}
      />

      {inboxOpen && (
        <div className={styles.inboxPopup}>
          {lastConversationsLastMessages.map(
            (message: IPopulatedMessage, index: number) => {
              const otherUser: IUser =
                message.from._id !== user._id
                  ? message.from
                  : message.to.filter((to) => to._id !== user._id)[0];

              return (
                <div key={index} className={styles.conversationContainer}>
                  <UserProfilePicture
                    url={otherUser.profilePicture?.url}
                    size={SizeEnum.Small}
                  />

                  <div className={styles.userNameAndLastMessage}>
                    <span className={styles.userName}>
                      {otherUser.firstName + " " + otherUser.lastName}
                    </span>
                    <div
                      className={styles.messageContent}
                      dangerouslySetInnerHTML={{ __html: message.message }}
                    ></div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderInbox;
