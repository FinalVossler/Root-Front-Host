import React from "react";
import { useTheme } from "react-jss";
import { RxCrossCircled } from "react-icons/rx";
import { socketConnect } from "socket.io-react";
import { Socket } from "socket.io-client";

import { Theme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chatSlice,
  getConversationId,
  IMessage,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./message.styles";
import { toast } from "react-toastify";
import ChatMessagesEnum from "../../../globalTypes/ChatMessagesEnum";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import ConfirmationModal from "../../confirmationModal";

interface IMessageComponent {
  message: IMessage;
  socket: Socket;
}
const Message: React.FunctionComponent<IMessageComponent> = (
  props: IMessageComponent
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const axios = useAuthorizedAxios();

  const ownMessage = React.useMemo(() => {
    return user._id === props.message.from;
  }, [user, props.message]);

  const handleModalConfirm = () => {
    props.socket.emit(ChatMessagesEnum.Delete, props.message);

    setDeleteLoading(true);
    axios
      .request({
        url: "/messages",
        method: "DELETE",
        params: {
          messageId: props.message._id,
        },
      })
      .then(() => {
        props.socket.emit(ChatMessagesEnum.Delete, props.message);
        toast.success("Deleted");
        const conversationId: string = getConversationId([...props.message.to]);

        dispatch(
          chatSlice.actions.deleteMessage({
            conversationId,
            messageId: props.message._id,
          })
        );

        setModalOpen(false);
      })
      .finally(() => setDeleteLoading(false));
  };

  const handleDelete = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div
      id={"message" + props.message._id}
      className={
        ownMessage ? styles.messageContainer : styles.otherMessageContainer
      }
    >
      <ConfirmationModal
        onConfirm={handleModalConfirm}
        description="This message is going to be deleted for everyone. Are you sure"
        title="Delete message"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        loading={deleteLoading}
      />

      {user._id === props.message.from && (
        <RxCrossCircled
          onClick={handleDelete}
          className={styles.deleteButton}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: props.message.message }}></div>
      {props.message.files.length > 0 && (
        <div className={styles.filesContainer}>
          {props.message.files.map((file) => {
            return (
              <div
                id={"file " + file.uuid}
                key={file._id}
                className={styles.singleFileContainer}
              >
                {file.isImage && (
                  <img
                    width="100%"
                    height="100%"
                    className={styles.file}
                    src={file.url}
                  />
                )}
                {!file.isImage && <iframe src={file.url} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(socketConnect(Message));
