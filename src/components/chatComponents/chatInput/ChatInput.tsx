import React from "react";
import { useTheme } from "react-jss";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineSend } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";

import { Theme } from "../../../config/theme";

import useStyles from "./chatInput.styles";

interface IChatInput {}
const ChatBox: React.FunctionComponent<IChatInput> = (props: IChatInput) => {
  const [message, setMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const handleEmojiClick = (e) => {
    if (e.emoji === "🫠" || e.emoji === undefined) return;
    setMessage(message + e.emoji);
  };

  return (
    <div className={styles.chatInputContainer}>
      <HiEmojiHappy
        onClick={handleShowEmojiPicker}
        className={styles.emojiButton}
      />
      {showEmojiPicker && (
        <div onClick={handleShowEmojiPicker} className={styles.emojiLayer} />
      )}
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

      <div className={styles.inputAndSendContainer}>
        <input
          onChange={handleMessageChange}
          value={message}
          className={styles.chatInput}
        />
        <div className={styles.sendButton}>
          <AiOutlineSend className={styles.sendButtonIcon} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatBox);
