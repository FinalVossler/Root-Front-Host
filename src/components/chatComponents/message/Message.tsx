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
      dangerouslySetInnerHTML={{ __html: props.message.message }}
      className={
        ownMessage ? styles.messageContainer : styles.otherMessageContainer
      }
    ></div>
  );
};

export default React.memo(Message);
