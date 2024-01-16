import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import useStyles from "./messageOptions.styles";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITheme } from "../../../../config/theme";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import ConfirmationModal from "../../../confirmationModal";
import useAuthorizedAxios from "../../../../hooks/useAuthorizedAxios";
import {
  getConversationId,
  chatSlice,
} from "../../../../store/slices/chatSlice";
import { toast } from "react-toastify";
import { RxCrossCircled } from "react-icons/rx";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import useCreateReaction from "../../../../hooks/apiHooks/useCreateReaction";
import {
  IMessageReadDto,
  IReactionCreateCommand,
  IUserReadDto,
  ReactionEnum,
} from "roottypes";

interface IMessageOptionsProps {
  message: IMessageReadDto;
}

const MessageOptions: React.FunctionComponent<IMessageOptionsProps> = (
  props: IMessageOptionsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  //#region local state
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  //#endregion local state

  const styles = useStyles({ theme });
  const optionsContainerRef = React.useRef(null);
  useOnClickOutside(optionsContainerRef, () => setShowOptions(false));
  const dispatch = useAppDispatch();
  const axios = useAuthorizedAxios();
  const { createReaction, loading: createReactionLoading } =
    useCreateReaction();

  //#region event listeners
  const handleDelete = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleModalConfirm = () => {
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
        toast.success("Deleted");
        const conversationId: string = getConversationId([...props.message.to]);

        dispatch(
          chatSlice.actions.deleteMessage({
            conversationId,
            messageId: props.message._id,
          })
        );

        setDeleteModalOpen(false);
      })
      .finally(() => setDeleteLoading(false));
  };

  const handleEmojiClick = async (emoji: ReactionEnum) => {
    setShowEmojiPicker(false);

    const createReactionCommand: IReactionCreateCommand = {
      messageId: props.message._id.toString(),
      reaction: emoji,
    };
    createReaction(createReactionCommand, props.message);
  };
  //#endregion event listeners

  return (
    <div className={styles.messageOptionsContainer}>
      <ConfirmationModal
        onConfirm={handleModalConfirm}
        description="This message is going to be deleted for everyone. Are you sure"
        title="Delete message"
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        loading={deleteLoading}
      />

      <HiOutlineEmojiHappy
        className={styles.messageOptionsIcon}
        onClick={() => setShowEmojiPicker(true)}
      ></HiOutlineEmojiHappy>

      {showEmojiPicker && (
        <div
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={styles.emojiLayer}
        />
      )}
      {showEmojiPicker && (
        <div className={styles.emojiContainer}>
          <span
            onClick={() => handleEmojiClick(ReactionEnum.Love)}
            className={styles.singleReaction}
          >
            ❤️
          </span>
          <span
            onClick={() => handleEmojiClick(ReactionEnum.Laugh)}
            className={styles.singleReaction}
          >
            😂
          </span>
          <span
            onClick={() => handleEmojiClick(ReactionEnum.Shock)}
            className={styles.singleReaction}
          >
            😮
          </span>
          <span
            onClick={() => handleEmojiClick(ReactionEnum.Cry)}
            className={styles.singleReaction}
          >
            😭
          </span>
          <span
            onClick={() => handleEmojiClick(ReactionEnum.Angry)}
            className={styles.singleReaction}
          >
            😠
          </span>
          <span
            onClick={() => handleEmojiClick(ReactionEnum.OK)}
            className={styles.singleReaction}
          >
            👍
          </span>
        </div>
      )}

      {props.message.from === user._id.toString() && (
        <BsThreeDotsVertical
          className={styles.messageOptionsIcon}
          onClick={() => setShowOptions(!showOptions)}
        />
      )}

      {showOptions && (
        <div ref={optionsContainerRef} className={styles.optionsContainer}>
          {user._id === props.message.from && (
            <RxCrossCircled
              className={styles.deleteMessageButton}
              onClick={handleDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MessageOptions;
