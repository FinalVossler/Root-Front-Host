import React from "react";
import { useTheme } from "react-jss";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineSend } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";
import { socketConnect } from "socket.io-react";
import { Socket } from "socket.io-client";

import { Theme } from "../../../config/theme";

import useStyles from "./chatInput.styles";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { IUser } from "../../../store/slices/userSlice";
import { useAppSelector } from "../../../store/hooks";
import ChatMessagesEnum from "../../../globalTypes/ChatMessagesEnum";
import { IMessage, MessageSendCommand } from "../../../store/slices/chatSlice";
import SuccessResponseDto from "../../../globalTypes/SuccessResponseDto";

interface IChatInput {
  conversationalists: string[];
  socket: Socket;
  handleAddMessage: (message: IMessage) => void;
}

const ChatInput: React.FunctionComponent<IChatInput> = (props: IChatInput) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const messageRef: React.MutableRefObject<HTMLDivElement | undefined> =
    React.useRef<HTMLDivElement>();

  // Autofocus the textarea and add the enter event listener logic
  React.useEffect(() => {
    messageRef?.current?.focus();

    const enterEvent = (e: any) => {
      // If we press Enter without shift, then we send the message and prevent the default return to line behavior
      if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    messageRef.current?.addEventListener("keypress", enterEvent);

    return () => {
      messageRef.current?.removeEventListener("keypress", enterEvent);
    };
  }, [messageRef.current, props.conversationalists]);

  //#region Listeners
  const handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (e) => {
    if (e.emoji === "🫠" || e.emoji === undefined) return;
    if (messageRef.current?.innerHTML !== undefined) {
      messageRef.current.innerHTML = messageRef.current.innerHTML + e.emoji;
    }
  };

  const handleSendMessage = (
    e: React.FormEvent<HTMLFormElement> | null = null
  ) => {
    e?.preventDefault();

    const message: string | undefined = messageRef?.current?.innerHTML;

    if (!message || message.trim() === "") return;

    const messageCommand: MessageSendCommand = {
      from: user._id,
      to: props.conversationalists,
      message,
    };

    axios
      .request<SuccessResponseDto<IMessage>>({
        method: "POST",
        url: "/messages",
        data: messageCommand,
      })
      .then((res) => {
        const message: IMessage = res.data.data;
        props.handleAddMessage(message);
        props.socket.emit(ChatMessagesEnum.Send, message);
        if (messageRef.current?.innerHTML) {
          messageRef.current.innerHTML = "";
        }
      });
  };
  //#endregion Listeners

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
        <div
          ref={messageRef as React.RefObject<HTMLDivElement>}
          className={styles.chatInput}
          contentEditable
          suppressContentEditableWarning={true}
        ></div>
        <button className={styles.sendButton}>
          <AiOutlineSend className={styles.sendButtonIcon} />
        </button>
      </form>
    </div>
  );
};

export default React.memo(socketConnect(ChatInput));
