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
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { BoxType } from "../../components/chatComponents/chatBox/ChatBox";
interface IChat {}

const Chat: React.FunctionComponent<IChat> = (props: IChat) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const withChat: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withChat
  );
  const selectedConversationId: string | undefined = useAppSelector(
    (state) => state.chat.selectedConversationId
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.chat
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  if (!withChat) return null;

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatPageContent}>
        <ChatContacts />

        {selectedConversationId && (
          <ChatBox
            conversationId={selectedConversationId}
            boxType={BoxType.FullPageBox}
          />
        )}

        {!selectedConversationId && (
          <div className={styles.chatWelcome}>
            <img className={styles.chatRobot} src="/robot.gif" />
            <span className={styles.welcomeText}>
              {getTranslatedText(staticText?.welcome)},{" "}
              <span className={styles.welcomeTextUserName}>
                {user.firstName} {user.lastName}
              </span>
            </span>

            <span className={styles.chatDirectionText}>
              {getTranslatedText(staticText?.welcomeText)}
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
