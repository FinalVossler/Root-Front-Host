import React from "react";

import { ITheme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import ChatBox, { BoxType } from "../chatBox/ChatBox";

import useStyles from "./chatBoxes.styles";

interface IChatboxesProps {}
const ChatBoxes: React.FunctionComponent<IChatboxesProps> = (
  props: IChatboxesProps
) => {
  const theme: ITheme = useAppSelector(
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
