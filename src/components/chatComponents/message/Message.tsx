import React from "react";
import { socketConnect } from "socket.io-react";
import { Socket } from "socket.io-client";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import {
  Conversation,
  IMessage,
  IReaction,
  ReactionEnum,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./message.styles";
import MessageOptions from "./messageOptions";
import moment from "moment";
import getRelativeDate from "../../../utils/getRelativeDate";
import UserProfilePicture from "../../userProfilePicture";
import { SizeEnum } from "../../userProfilePicture/UserProfilePicture";
import MessageFilePreview from "./messageFilePreview/MessageFilePreview";
import IFile from "../../../globalTypes/IFile";
import { AiFillEye } from "react-icons/ai";

interface IMessageComponent {
  message: IMessage;
  socket: Socket;
  conversation: Conversation;
}
const Message: React.FunctionComponent<IMessageComponent> = (
  props: IMessageComponent
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [mouseOver, setMouseOver] = React.useState<boolean>(false);
  const [fileToPreview, setFileToPreview] = React.useState<IFile | null>(null);

  const styles = useStyles({ theme });
  const ownMessage = React.useMemo(() => {
    return user._id === props.message.from;
  }, [user, props.message]);

  const usersWithTheirLastReadMessageInConversationSetAsThisMessage =
    React.useMemo(() => {
      return props.conversation.usersWithLastReadMessageInConversation?.filter(
        (u) =>
          u.lastReadMessageInConversation?._id.toString() ===
            props.message._id.toString() &&
          u._id.toString() !== user._id.toString()
      );
    }, [props.conversation.usersWithLastReadMessageInConversation, user]);

  const sender = React.useMemo(
    () =>
      props.conversation.usersWithLastReadMessageInConversation?.find(
        (u) => u._id.toString() === props.message.from.toString()
      ),
    [props.message, props.conversation]
  );

  return (
    <div
      className={
        ownMessage
          ? styles.messageAndOptionsContainer
          : styles.otherMessageAndOptionsContainer
      }
      style={{
        // If we are in a group conversation, and the message isn't our own, then we need a bigger margin bottom to leave space for message sender name
        marginBottom: !ownMessage && props.message.to.length > 2 ? 20 : 10,
      }}
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
    >
      {props.message.to.length > 2 &&
        sender &&
        sender?._id.toString() !== user._id.toString() && (
          <span className={styles.senderName}>
            {sender?.firstName + " " + sender?.lastName}
          </span>
        )}
      <div
        id={"message" + props.message._id}
        className={
          ownMessage ? styles.messageContainer : styles.otherMessageContainer
        }
      >
        <div
          className={styles.messageItself}
          dangerouslySetInnerHTML={{ __html: props.message.message }}
        ></div>

        {props.message.files.length > 0 && (
          <div className={styles.filesContainer}>
            {props.message.files.map((file) => {
              return (
                <div
                  id={"file " + file.uuid}
                  key={file._id}
                  className={styles.singleFileContainer}
                  onClick={() => setFileToPreview(file)}
                >
                  {file.isImage && (
                    <img
                      width="100%"
                      height="100%"
                      className={styles.file}
                      src={file.url}
                    />
                  )}
                  {!file.isImage && (
                    <React.Fragment>
                      <iframe className={styles.file} src={file.url} />
                      <AiFillEye
                        className={styles.viewFileIcon}
                        onClick={() => setFileToPreview(file)}
                      />
                    </React.Fragment>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* File Preview */}
        {fileToPreview && (
          <MessageFilePreview
            message={props.message}
            file={fileToPreview}
            onClose={() => setFileToPreview(null)}
          />
        )}

        <div
          className={
            props.message.from === user._id.toString()
              ? styles.existingReactionsContainer
              : styles.otherExistingReactionsContainer
          }
        >
          {props.message.reactions?.map((r, i) => (
            <Reaction reaction={r} key={i} />
          ))}
        </div>
      </div>

      {mouseOver && <MessageOptions message={props.message} />}

      {mouseOver && (
        <div
          className={
            props.message.from === user._id.toString()
              ? styles.messageDate
              : styles.otherMessageDate
          }
        >
          {getRelativeDate(moment(props.message.createdAt))}
        </div>
      )}

      {typeof usersWithTheirLastReadMessageInConversationSetAsThisMessage?.length ===
        "number" &&
        usersWithTheirLastReadMessageInConversationSetAsThisMessage?.length >
          0 && (
          <div className={styles.readByContainer}>
            {props.conversation.usersWithLastReadMessageInConversation
              ?.filter(
                (u) =>
                  u.lastReadMessageInConversation?._id.toString() ===
                    props.message._id.toString() &&
                  u._id.toString() !== user._id.toString()
              )
              .map((u, userIndex) => {
                const readAt: string | undefined =
                  u.lastReadMessageInConversation?.readAt
                    ?.find((el) => el.indexOf(u._id.toString()) >= 0)
                    ?.split("-")[1];

                return (
                  <div className={styles.useReadProfilePicture} key={userIndex}>
                    <UserProfilePicture
                      key={u._id.toString()}
                      size={SizeEnum.VerySmall}
                      url={u.profilePicture?.url}
                    />
                    {readAt && (
                      <span
                        className={styles.firstNameAndLastNameAndReadAt}
                        style={{
                          left:
                            -((u.firstName + " " + u.lastName).length * 8) / 2,
                        }}
                      >
                        <span>{u.firstName + " " + u.lastName}</span>
                        <span>{getRelativeDate(moment(readAt))}</span>
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        )}
    </div>
  );
};

interface IReactionComponent {
  reaction: IReaction;
}

const Reaction: React.FunctionComponent<IReactionComponent> = React.memo(
  (props: IReactionComponent) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );

    //#region local state
    const [showReactorName, setShowReactorName] =
      React.useState<boolean>(false);
    //#endregion local state

    const styles = useStyles({ theme });

    return (
      <span
        className={styles.singleExistingReaction}
        onMouseEnter={() => setShowReactorName(true)}
        onMouseLeave={() => setShowReactorName(false)}
      >
        {
          {
            [ReactionEnum.Love]: "❤️",
            [ReactionEnum.Angry]: "😠",
            [ReactionEnum.Cry]: "😭",
            [ReactionEnum.Shock]: "😮",
            [ReactionEnum.Laugh]: "😂",
          }[props.reaction.reaction]
        }
        {showReactorName && (
          <span
            className={styles.reactorName}
            style={{
              left: -(
                ((
                  props.reaction.user.firstName +
                  " " +
                  props.reaction.user.lastName
                ).length *
                  9) /
                  2 || 0
              ),
            }}
          >
            {props.reaction.user.firstName + " " + props.reaction.user.lastName}
          </span>
        )}
      </span>
    );
  }
);

export default React.memo(socketConnect(Message));
