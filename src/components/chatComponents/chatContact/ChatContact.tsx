import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { chatSlice } from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./chatContact.styles";

interface IChatContact {
  contact: IUser;
}
const ChatContact: React.FunctionComponent<IChatContact> = (
  props: IChatContact
) => {
  const selectedContactId: string | undefined = useAppSelector(
    (state) => state.chat.selectedContactId
  );

  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();

  const styles = useStyles({ theme });

  const handleSelectContact = () => {
    dispatch(chatSlice.actions.setSelectedContactID(props.contact._id));
  };

  return (
    <div
      onClick={handleSelectContact}
      className={
        selectedContactId === props.contact._id
          ? styles.chatSelectedContactContainer
          : styles.chatContactContainer
      }
    >
      <img className={styles.chatAvatar} src="/logo512.png" />

      <h2 className={styles.contactName}>
        {props.contact.firstName} {props.contact.lastName}
      </h2>
    </div>
  );
};

export default React.memo(ChatContact);
