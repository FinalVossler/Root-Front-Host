import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useGetLastConversationsLastMessages from "../../hooks/apiHooks/useGetLastConversationsLastMessages";

import useStyles from "./headerInbox.styles";
import {
  chatSlice,
  getConversationId,
  IMessage,
  IPopulatedMessage,
} from "../../store/slices/chatSlice";
import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";
import { IUser } from "../../store/slices/userSlice";
import Pagination from "../pagination";
import ChatBoxes from "../chatComponents/chatBoxes";

interface IHeaderInbox {}

const LIMIT = 99;

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
  const dispatch = useAppDispatch();
  const inboxRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(inboxRef, () => {
    setInboxOpen(false);
  });
  const { getLastConversationsLastMessages, loading } =
    useGetLastConversationsLastMessages();

  React.useEffect(() => {
    // Reset everything when the component has just loaded to not have a snapping event
    if (inboxOpen) {
      dispatch(
        chatSlice.actions.setLastConversationsLastMessages({
          messages: [],
          total: 0,
        })
      );
    }
  }, [inboxOpen]);

  React.useEffect(() => {
    if (inboxOpen) {
      getLastConversationsLastMessages({
        paginationCommand: {
          limit: LIMIT,
          page,
        },
      });
    }
  }, [inboxOpen, page]);

  const handleOpenInbox = () => setInboxOpen(!inboxOpen);

  const handlePageChange = (page: number) => setPage(page);

  const handleSelectConversation = (message: IPopulatedMessage) => {
    const conversationId: string = getConversationId([
      ...message.to.map((u) => u._id),
    ]);
    dispatch(chatSlice.actions.addSelectedConversation({ conversationId }));
    setInboxOpen(false);
  };

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
          {loading && <Loading className={styles.headerInboxLoading} />}
          {!loading &&
            lastConversationsLastMessages.map(
              (message: IPopulatedMessage, index: number) => {
                const otherUser: IUser =
                  message.from._id !== user._id
                    ? message.from
                    : message.to.filter((to) => to._id !== user._id)[0];

                return (
                  <div
                    key={index}
                    onClick={() => handleSelectConversation(message)}
                    className={styles.conversationContainer}
                  >
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

          <Pagination
            total={total}
            page={page}
            onPageChange={handlePageChange}
            limit={LIMIT}
          />
        </div>
      )}

      <ChatBoxes />
    </div>
  );
};

export default HeaderInbox;
