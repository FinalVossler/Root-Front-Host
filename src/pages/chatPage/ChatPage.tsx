import React from "react";
import { useTheme } from "react-jss";
import { AiFillHome } from "react-icons/ai";

import ChatContacts from "../../components/chatComponents/chatContacts";
import ChatBox from "../../components/chatComponents/chatBox";

import { Theme } from "../../config/theme";
import SuccessResponseDto from "../../globalTypes/SuccessResponseDto";
import withProtection from "../../hoc/protection";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { chatSlice } from "../../store/slices/chatSlice";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./chatPage.styles";

interface IChat {}
const Chat: React.FunctionComponent<IChat> = (props: IChat) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const selectedContactId: string | undefined = useAppSelector(
    (state) => state.chat.selectedContactId
  );

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    axios
      .request<SuccessResponseDto<IUser[]>>({
        url: "/users",
        method: "GET",
      })
      .then((res) => {
        dispatch(chatSlice.actions.setContacts(res.data.data));
      });
  }, [axios]);

  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatPageContent}>
        <ChatContacts />

        <div className={styles.chatButtons}>
          <a href="/">
            <AiFillHome className={styles.chatButton} />
          </a>
        </div>

        {selectedContactId && (
          <ChatBox selectedContacts={[selectedContactId, user._id]} />
        )}

        {!selectedContactId && (
          <div className={styles.chatWelcome}>
            <img className={styles.chatRobot} src="/robot.gif" />
            <span className={styles.welcomeText}>
              Welcome,{" "}
              <span className={styles.welcomeTextUserName}>
                {user.firstName} {user.lastName}
              </span>
            </span>

            <span className={styles.chatDirectionText}>
              Please select a chat to start messaging
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default withProtection(Chat);
