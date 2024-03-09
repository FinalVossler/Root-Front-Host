import React from "react";
import { IChatGetContactsCommand, ITheme, IUserReadDto } from "roottypes";

import useGetChatContacts from "../../../../hooks/apiHooks/useGetChatContacts";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { chatSlice } from "../../../../store/slices/chatSlice";
import ChatCurrentUser from "../chatCurrentUser.ts";

import useStyles from "./chatContacts.styles";
import LastConversationsLastMessages from "../lastConversationsLastMessages";

const LIMIT = 10;

interface IChatContactsProps {}
const ChatContacts: React.FunctionComponent<IChatContactsProps> = () => {
  const selectedConversationId: string | undefined = useAppSelector(
    (state) => state.chat.selectedConversationId
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const contactsPage: number = useAppSelector(
    (state) => state.chat.contactsPage
  );

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const { getChatContacts } = useGetChatContacts();

  // Get the list of contacts
  React.useEffect(() => {
    const command: IChatGetContactsCommand = {
      paginationCommand: {
        limit: LIMIT,
        page: contactsPage,
      },
    };
    getChatContacts(command);
  }, [contactsPage]);

  const handlePageChange = (page: number) => {
    dispatch(chatSlice.actions.setContactsPage(page));
  };

  const handleSelectConversation = (conversationId: string) => {
    dispatch(chatSlice.actions.setSelectedConversationId(conversationId));
  };

  return (
    <div
      className={
        selectedConversationId
          ? styles.chatContactsContainerConversationSelected
          : styles.noConversationSelectedChatContactsContainer
      }
    >
      <LastConversationsLastMessages
        onSelectConversation={handleSelectConversation}
      />
      {/* <div className={styles.top}>
        <div className={styles.contactsTitle}>
          {getTranslatedText(staticText?.title)}
        </div>

        <div className={styles.chatContactsListContainer}>
          {getChatContactsLoading && <Loading />}
          {contacts &&
            !getChatContactsLoading &&
            contacts.map((contact, index) => {
              return <Contact key={index} contact={contact} />;
            })}
        </div>

        {!getChatContactsLoading && (
          <Pagination
            page={contactsPage}
            limit={LIMIT}
            total={totalContacts}
            onPageChange={handlePageChange}
          />
        )}
      </div> */}

      <ChatCurrentUser />
    </div>
  );
};

export default React.memo(ChatContacts);
