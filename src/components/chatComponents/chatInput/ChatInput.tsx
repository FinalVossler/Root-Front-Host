import React from "react";
import { useTheme } from "react-jss";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineSend } from "react-icons/ai";
import { HiEmojiHappy } from "react-icons/hi";
import { socketConnect } from "socket.io-react";
import { Socket } from "socket.io-client";
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
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { IUser } from "../../../store/slices/userSlice";
import { useAppSelector } from "../../../store/hooks";
import ChatMessagesEnum from "../../../globalTypes/ChatMessagesEnum";
import {
  getConversationConversationalistsFromConversationId,
  IMessage,
  MessageSendCommand,
} from "../../../store/slices/chatSlice";
import SuccessResponseDto from "../../../globalTypes/SuccessResponseDto";
import IFile from "../../../globalTypes/IFile";
import uploadFile from "../../../utils/uploadFile";

interface IChatInput {
  conversationId: string;
  socket: Socket;
  handleAddMessage: (message: IMessage) => void;
}

const ChatInput: React.FunctionComponent<IChatInput> = (props: IChatInput) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [loading, setLoading] = React.useState(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
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
  }, [messageRef.current, props.conversationId]);

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

    setLoading(true);

    const filesToSend: IFile[] = [];
    const promises = files.map((file) => {
      return uploadFile(file);
    });

    if (promises.length > 0) {
      await Promise.all(promises).then((files: (IFile | null)[]) => {
        files.forEach((file) => {
          if (file?.url) filesToSend.push(file);
        });
      });
    }

    const messageCommand: MessageSendCommand = {
      from: user._id,
      to: getConversationConversationalistsFromConversationId(
        props.conversationId
      ),
      message: message ?? "",
      files: filesToSend,
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
        setFiles([]);
      })
      .finally(() => setLoading(false));
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
  //#endregion Listeners

  return (
    <div className={styles.chatInputContainer}>
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
        {loading && (
          <ReactLoading
            className={styles.loading}
            type={"spin"}
            color={theme.primary}
            width={150}
            height={150}
          />
        )}

        {!loading && (
          <button className={styles.sendButton}>
            <AiOutlineSend className={styles.sendButtonIcon} />
          </button>
        )}
      </form>
    </div>
  );
};

export default React.memo(socketConnect(ChatInput));
