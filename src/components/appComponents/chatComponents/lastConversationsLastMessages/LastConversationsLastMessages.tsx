import React from "react";
import Loading from "react-loading";

import { ITheme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import useGetLastConversationsLastMessages from "../../../../hooks/apiHooks/useGetLastConversationsLastMessages";

import useStyles from "./lastConversationsLastMessages.styles";
import {
  getConversationId,
  IPopulatedMessageReadDto,
} from "../../../../store/slices/chatSlice";
import { IUserReadDto } from "../../../../store/slices/userSlice";
import Pagination from "../../../fundamentalComponents/pagination";
import useSearchUsers from "../../../../hooks/apiHooks/useSearchUsers";
import SearchInput from "../../../fundamentalComponents/searchInput";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import useGetUserTotalUnreadMessages from "../../../../hooks/apiHooks/useGetUserTotalUnreadMessages";
import InboxConversation from "../inboxConversation";

interface ILastConversationsLastMessagesProps {
  onSelectConversation: (conversationId: string) => void;
}

const LIMIT = 99;

const LastConversationsLastMessages: React.FunctionComponent<
  ILastConversationsLastMessagesProps
> = (props: ILastConversationsLastMessagesProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const lastConversationsLastMessages = useAppSelector(
    (state) => state.chat.lastConversationsLastMessages
  );
  const total = useAppSelector(
    (state) => state.chat.totalLastConversationsLastMessages
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.chat
  );
  const alreadyLoadedLastConversationsLastMessagesFromBackend: boolean =
    useAppSelector(
      (state) =>
        state.chat.alreadyLoadedLastConversationsLastMessagesFromBackend
    );

  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { getLastConversationsLastMessages, loading } =
    useGetLastConversationsLastMessages();
  const { handleSearchUsersPromise } = useSearchUsers({
    setStoreAfterSearch: false,
  });
  const { getUserTotalUnreadMessages } = useGetUserTotalUnreadMessages();

  React.useEffect(() => {
    if (!alreadyLoadedLastConversationsLastMessagesFromBackend) {
      getLastConversationsLastMessages({
        paginationCommand: {
          limit: LIMIT,
          page,
        },
      });
    }
  }, [page]);

  // Get total unread messages
  React.useEffect(() => {
    getUserTotalUnreadMessages();
  }, []);

  const handlePageChange = (page: number) => setPage(page);

  const handleSelectConversationfromUsers = (users: IUserReadDto[]) => {
    const conversationId: string = getConversationId([
      ...users.map((u) => u._id),
    ]);
    props.onSelectConversation(conversationId);
  };

  return (
    <div className={styles.lastConversationsLastMessagesContainer}>
      <SearchInput
        getElementTitle={(user: IUserReadDto) =>
          user.firstName + " " + user.lastName
        }
        searchPromise={handleSearchUsersPromise}
        onElementClick={(u: IUserReadDto) =>
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
          className={styles.lastConversationsLastMessagesLoading}
        />
      )}
      {!loading &&
        lastConversationsLastMessages.map(
          (message: IPopulatedMessageReadDto) => {
            const otherUser: IUserReadDto =
              message.from._id !== user._id
                ? message.from
                : message.to.filter((to) => to._id !== user._id)[0];

            return (
              <InboxConversation
                key={message._id.toString()}
                message={message}
                otherUser={otherUser}
                onSelectConversation={props.onSelectConversation}
              />
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
  );
};

export default LastConversationsLastMessages;
