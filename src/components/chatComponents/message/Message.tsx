import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IMessage } from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./message.styles";

interface IMessageComponent {
  message: IMessage;
}
const Message: React.FunctionComponent<IMessageComponent> = (
  props: IMessageComponent
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  const ownMessage = React.useMemo(() => {
    return user._id === props.message.from;
  }, [user, props.message]);

  return (
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
              <div key={file._id} className={styles.singleFileContainer}>
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

export default React.memo(Message);
