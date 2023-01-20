import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IUser } from "../../../store/slices/userSlice";
import Contact from "../chatContact/ChatContact";
import ChatCurrentUser from "../chatCurrentUser.ts";

import useStyles from "./chatContacts.styles";

interface IChatContacts {}
const ChatContacts: React.FunctionComponent<IChatContacts> = (
  props: IChatContacts
) => {
  const contacts: IUser[] = useAppSelector((state) => state.chat.contacts);

  const theme: Theme = useTheme();

  const styles = useStyles({ theme });

  return (
    <div className={styles.chatContactsContainer}>
      <div className={styles.top}>
        <div className={styles.contactsTitle}>Chat</div>

        <div className={styles.chatContactsListContainer}>
          {contacts.map((contact, index) => {
            return <Contact key={index} contact={contact} />;
          })}
        </div>
      </div>

      <ChatCurrentUser />
    </div>
  );
};

export default React.memo(ChatContacts);
