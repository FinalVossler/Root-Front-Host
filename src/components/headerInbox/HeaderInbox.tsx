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
  IPopulatedMessage,
} from "../../store/slices/chatSlice";
import UserProfilePicture from "../userProfilePicture";
import { SizeEnum } from "../userProfilePicture/UserProfilePicture";
import { IUser } from "../../store/slices/userSlice";
import Pagination from "../pagination";
import ChatBoxes from "../chatComponents/chatBoxes";
import useSearchUsers from "../../hooks/apiHooks/useSearchUsers";
import SearchInput from "../searchInput";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useLocation } from "react-router-dom";

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
    // Empty selected conversations when this component is unmounted
    return () => {
      dispatch(chatSlice.actions.unselectAllConversations());
    };
  }, []);

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

  const handleSelectConversationFromMessage = (message: IPopulatedMessage) => {
    const conversationId: string = getConversationId([
      ...message.to.map((u) => u._id),
    ]);
    dispatch(chatSlice.actions.addSelectedConversation({ conversationId }));
    setInboxOpen(false);
  };

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
      <BsFillChatDotsFill
        onClick={handleOpenInbox}
        className={styles.inboxIcon}
      />

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
              },
            }}
          />
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
                    key={message._id}
                    onClick={() => handleSelectConversationFromMessage(message)}
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

      {pathname != "/chat" && <ChatBoxes />}
    </div>
  );
};

export default HeaderInbox;
