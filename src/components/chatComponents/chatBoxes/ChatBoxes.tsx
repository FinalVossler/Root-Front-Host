import React from "react";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import ChatBox, { BoxType } from "../chatBox/ChatBox";

import useStyles from "./chatBoxes.styles";

interface IChatboxes {}
const ChatBoxes: React.FunctionComponent<IChatboxes> = (props: IChatboxes) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const selectedConversationIds: string[] | undefined = useAppSelector(
    (state) => state.chat.selectedConversationIds
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.chatBoxesContainer}>
      {selectedConversationIds?.map((conversationId) => (
        <ChatBox
          key={conversationId}
          conversationId={conversationId}
          boxType={BoxType.SmallBox}
        />
      ))}
    </div>
  );
};

export default React.memo(ChatBoxes);
