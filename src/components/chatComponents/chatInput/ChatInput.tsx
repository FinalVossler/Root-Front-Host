import React from "react";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineSend } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";
import {
  AiFillFileAdd,
  AiFillFilePdf,
  AiFillFileImage,
  AiFillProfile,
} from "react-icons/ai";
import { ImCross } from "react-icons/im";
import ReactLoading from "react-loading";

import { Theme } from "../../../config/theme";
import useStyles from "./chatInput.styles";
import { IUser } from "../../../store/slices/userSlice";
import { useAppSelector } from "../../../store/hooks";
import {
  getConversationConversationalistsFromConversationId,
  IPopulatedMessage,
} from "../../../store/slices/chatSlice";
import useSendMessage, {
  MessageSendCommand,
} from "../../../hooks/apiHooks/useSendMessage";

interface IChatInput {
  conversationId: string;
  handleAddMessage: (message: IPopulatedMessage) => void;
  handleChatMessageBoxClick?: () => void;
}

const ChatInput: React.FunctionComponent<IChatInput> = (props: IChatInput) => {
  //#region App state
  const user: IUser = useAppSelector((state) => state.user.user);
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  //#endregion App state

  //#region Local state
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  //#endregion Local state

  //#region Hooks
  const styles = useStyles({ theme });
  const { sendMessage, loading } = useSendMessage();
  const messageRef: React.MutableRefObject<HTMLDivElement | undefined> =
    React.useRef<HTMLDivElement>();
  const fileRef: React.MutableRefObject<HTMLInputElement | undefined> =
    React.useRef<HTMLInputElement>();

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
  }, [messageRef.current, props.conversationId, files, files.length]);
  //#endregion Hooks

  //#region Listeners
  const handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (e) => {
    if (e.emoji === "🫠" || e.emoji === undefined) return;
    if (messageRef.current?.innerHTML !== undefined) {
      messageRef.current.innerHTML = messageRef.current.innerHTML + e.emoji;
    }
  };

  const handleSendMessage = async (
    e: React.FormEvent<HTMLFormElement> | null = null
  ) => {
    e?.preventDefault();

    const message: string | undefined = messageRef?.current?.innerHTML;

    if ((!message || message.trim() === "") && files.length === 0) return;

    const command: MessageSendCommand = {
      from: user._id,
      to: getConversationConversationalistsFromConversationId(
        props.conversationId
      ),
      message: message ?? "",
      files: [],
    };

    const createdMessage: IPopulatedMessage = await sendMessage(command, files);

    props.handleAddMessage(createdMessage);
    if (messageRef.current?.innerHTML) {
      messageRef.current.innerHTML = "";
    }
    setFiles([]);
    setShowEmojiPicker(false);
  };

  const handleFileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const newFiles: File[] = Array.from(event.target.files);

      setFiles(files.concat(newFiles));
    }
  };

  const handleRemoveFile = (index) => {
    if (files.length > index) {
      const newFiles: File[] = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
  };
  const handleChatInputClick = () => {
    if (props.handleChatMessageBoxClick) {
      props.handleChatMessageBoxClick();
    }
  };
  //#endregion Listeners

  return (
    <div onClick={handleChatInputClick} className={styles.chatInputContainer}>
      <AiFillFileAdd onClick={handleFileClick} className={styles.filesButton} />
      <input
        type="file"
        hidden
        ref={fileRef as React.RefObject<HTMLInputElement>}
        onChange={onFileChange}
        multiple
      />
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
        {files.length > 0 && (
          <div className={styles.filesContainer}>
            {files.map((file, index) => {
              return (
                <div key={index} className={styles.singleFileContainer}>
                  {file.type.indexOf("pdf") !== -1 && (
                    <AiFillFilePdf className={styles.fileIcon} />
                  )}
                  {file.type.indexOf("image") !== -1 && (
                    <AiFillFileImage className={styles.fileIcon} />
                  )}
                  {file.type.indexOf("image") !== -1 &&
                    file.type.indexOf("pdf") !== -1 && (
                      <AiFillProfile className={styles.fileIcon} />
                    )}

                  <ImCross
                    onClick={() => handleRemoveFile(index)}
                    className={styles.fileDeleteButton}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div
          ref={messageRef as React.RefObject<HTMLDivElement>}
          className={styles.chatInput}
          contentEditable
          suppressContentEditableWarning={true}
        ></div>

        <button disabled={loading} className={styles.sendButton}>
          <AiOutlineSend className={styles.sendButtonIcon} />
        </button>

        {loading && (
          <ReactLoading
            className={styles.loading}
            type={"spin"}
            color={theme.backgroundColor}
            width={36}
            height={36}
          />
        )}
      </form>
    </div>
  );
};

export default React.memo(ChatInput);
