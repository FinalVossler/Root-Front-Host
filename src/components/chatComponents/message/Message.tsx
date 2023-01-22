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
      className={
        ownMessage ? styles.messageContainer : styles.otherMessageContainer
      }
    >
      {props.message.message}
    </div>
  );
};

export default React.memo(Message);
