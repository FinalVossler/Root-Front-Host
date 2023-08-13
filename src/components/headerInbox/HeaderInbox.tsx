import React from "react";
import { BsChatDots } from "react-icons/bs";
import Loading from "react-loading";

import { Theme } from "../../config/theme";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useGetLastConversationsLastMessages from "../../hooks/apiHooks/useGetLastConversationsLastMessages";

import useStyles from "./headerInbox.styles";
import {
  chatSlice,
  getConversationId,
  IPopulatedMessage,
} from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";
import Pagination from "../pagination";
import ChatBoxes from "../chatComponents/chatBoxes";
import useSearchUsers from "../../hooks/apiHooks/useSearchUsers";
import SearchInput from "../searchInput";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useLocation } from "react-router-dom";
import useGetUserTotalUnreadMessages from "../../hooks/apiHooks/useGetUserTotalUnreadMessages";
import HeaderInboxConversation from "./headerInboxConversation";

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
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.chat
  );
  const totalUnreadMessages: number = useAppSelector(
    (state) => state.chat.totalUnreadMessages
  );
  const alreadyLoadedLastConversationsLastMessagesFromBackend: boolean =
    useAppSelector(
      (state) =>
        state.chat.alreadyLoadedLastConversationsLastMessagesFromBackend
    );

  const [inboxOpen, setInboxOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const inboxRef = React.useRef<HTMLDivElement>();
  useOnClickOutside(inboxRef, () => {
    setInboxOpen(false);
  });
  const { getLastConversationsLastMessages, loading } =
    useGetLastConversationsLastMessages();
  const { handleSearchUsersPromise } = useSearchUsers();
  const { getUserTotalUnreadMessages } = useGetUserTotalUnreadMessages();

  React.useEffect(() => {
    // Empty selected conversations when this component is unmounted
    return () => {
      dispatch(chatSlice.actions.unselectAllConversations());
    };
  }, []);

  React.useEffect(() => {
    if (inboxOpen && !alreadyLoadedLastConversationsLastMessagesFromBackend) {
      getLastConversationsLastMessages({
        paginationCommand: {
          limit: LIMIT,
          page,
        },
      });
    }
  }, [inboxOpen, page]);

  // Get total unread messages
  React.useEffect(() => {
    getUserTotalUnreadMessages();
  }, []);

  const handleOpenInbox = () => {
    dispatch(chatSlice.actions.setUserTotalUnreadMessages(0));
    setInboxOpen(!inboxOpen);
  };

  const handlePageChange = (page: number) => setPage(page);

  const handleSelectConversationfromUsers = (users: IUser[]) => {
    const conversationId: string = getConversationId([
      ...users.map((u) => u._id),
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
      <BsChatDots onClick={handleOpenInbox} className={styles.inboxIcon} />

      {totalUnreadMessages > 0 && (
        <span className={styles.notificationNumber}>{totalUnreadMessages}</span>
      )}

      {inboxOpen && (
        <div className={styles.inboxPopup}>
          <SearchInput
            getElementTitle={(user: IUser) =>
              user.firstName + " " + user.lastName
            }
            searchPromise={handleSearchUsersPromise}
            onElementClick={(u: IUser) =>
              handleSelectConversationfromUsers([user, u])
            }
            inputProps={{
              placeholder: getTranslatedText(staticText?.searchContacts),
              style: {
                width: "100%",
                paddingLeft: 37,
              },
            }}
          />
          {loading && (
            <Loading
              color={theme.primary}
              className={styles.headerInboxLoading}
            />
          )}
          {!loading &&
            lastConversationsLastMessages.map((message: IPopulatedMessage) => {
              const otherUser: IUser =
                message.from._id !== user._id
                  ? message.from
                  : message.to.filter((to) => to._id !== user._id)[0];

              return (
                <HeaderInboxConversation
                  key={message._id.toString()}
                  message={message}
                  otherUser={otherUser}
                  setInboxOpen={setInboxOpen}
                />
              );
            })}

          <Pagination
            total={total}
            page={page}
            onPageChange={handlePageChange}
            limit={LIMIT}
          />
        </div>
      )}

      {pathname != "/chat" && <ChatBoxes />}
    </div>
  );
};

export default HeaderInbox;
