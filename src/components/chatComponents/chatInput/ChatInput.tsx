import React from "react";
import { useTheme } from "react-jss";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineSend } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";

import { Theme } from "../../../config/theme";

import useStyles from "./chatInput.styles";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { IUser } from "../../../store/slices/userSlice";
import { useAppSelector } from "../../../store/hooks";

interface IChatInput {
  selectedContacts: string[];
}

const ChatBox: React.FunctionComponent<IChatInput> = (props: IChatInput) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [message, setMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();

  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const handleEmojiClick = (e) => {
    if (e.emoji === "🫠" || e.emoji === undefined) return;
    setMessage(message + e.emoji);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();

    axios
      .request({
        method: "POST",
        url: "/messages",
        data: {
          from: user._id,
          to: props.selectedContacts,
          message,
        },
      })
      .then(() => {
        setMessage("");
      });
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

      <form
        onSubmit={handleSendMessage}
        className={styles.inputAndSendContainer}
      >
        <input
          onChange={handleMessageChange}
          value={message}
          className={styles.chatInput}
        />
        <button className={styles.sendButton}>
          <AiOutlineSend className={styles.sendButtonIcon} />
        </button>
      </form>
    </div>
  );
};

export default React.memo(ChatBox);
