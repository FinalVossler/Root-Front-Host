import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import { IMessage } from "../../../store/slices/chatSlice";

import useStyles from "./message.styles";

interface IMessageComponent {
  message: IMessage;
}
const Message: React.FunctionComponent<IMessageComponent> = (
  props: IMessageComponent
) => {
  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  return <div className={styles.messageContainer}>{props.message.message}</div>;
};

export default React.memo(Message);
