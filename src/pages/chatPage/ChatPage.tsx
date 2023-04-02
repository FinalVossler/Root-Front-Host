import React from "react";

import ChatContacts from "../../components/chatComponents/chatContacts";
import ChatBox from "../../components/chatComponents/chatBox";

import { Theme } from "../../config/theme";
import withProtection from "../../hoc/protection";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../store/slices/userSlice";
import withWrapper from "../../hoc/wrapper";
import withChatHoc from "../../hoc/withChat";

import useStyles from "./chatPage.styles";
interface IChat {}

const Chat: React.FunctionComponent<IChat> = (props: IChat) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const withChat: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withChat
  );
  const selectedConversationId: string | undefined = useAppSelector(
    (state) => state.chat.selectedConversationId
  );

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  if (!withChat) return null;

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatPageContent}>
        <ChatContacts />

        {selectedConversationId && (
          <ChatBox conversationId={selectedConversationId} />
        )}

        {!selectedConversationId && (
          <div className={styles.chatWelcome}>
            <img className={styles.chatRobot} src="/robot.gif" />
            <span className={styles.welcomeText}>
              Welcome,{" "}
              <span className={styles.welcomeTextUserName}>
                {user.firstName} {user.lastName}
              </span>
            </span>

            <span className={styles.chatDirectionText}>
              Please select a chat to start messaging
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default withWrapper(withProtection(withChatHoc(Chat)), {
  withFooter: false,
  withSideMenu: true,
});
