import React from "react";
import { socketConnect } from "socket.io-react";
import { Socket } from "socket.io-client";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IMessage, ReactionEnum } from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./message.styles";
import MessageOptions from "./messageOptions";

interface IMessageComponent {
  message: IMessage;
  socket: Socket;
}
const Message: React.FunctionComponent<IMessageComponent> = (
  props: IMessageComponent
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [mouseOver, setMouseOver] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const ownMessage = React.useMemo(() => {
    return user._id === props.message.from;
  }, [user, props.message]);

  return (
    <div
      className={
        ownMessage
          ? styles.messageAndOptionsContainer
          : styles.otherMessageAndOptionsContainer
      }
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
    >
      <div
        id={"message" + props.message._id}
        className={
          ownMessage ? styles.messageContainer : styles.otherMessageContainer
        }
      >
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

        <div
          className={
            props.message.from === user._id.toString()
              ? styles.existingReactionsContainer
              : styles.otherExistingReactionsContainer
          }
        >
          {props.message.reactions?.map((r, i) => (
            <span key={i} className={styles.singleExistingReaction}>
              {
                {
                  [ReactionEnum.Love]: "❤️",
                  [ReactionEnum.Angry]: "😠",
                  [ReactionEnum.Cry]: "😭",
                  [ReactionEnum.Shock]: "😮",
                  [ReactionEnum.Laugh]: "😂",
                }[r.reaction]
              }
            </span>
          ))}
        </div>
      </div>

      {mouseOver && <MessageOptions message={props.message} />}
    </div>
  );
};

export default React.memo(socketConnect(Message));
