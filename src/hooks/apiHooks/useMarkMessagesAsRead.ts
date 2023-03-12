import { useAppDispatch } from "../../store/hooks";
import { chatSlice } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type MessageMarkMessagesAsReadByUserCommand = {
  messagesIds: string[];
};

const useMarkMessagesAsRead = () => {
  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const markMessageAsRead = (
    command: MessageMarkMessagesAsReadByUserCommand,
    conversationId: string,
    userId: string
  ) =>
    new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "/messages/markMessagesAsRead",
          data: command,
        })
        .then(() => {
          dispatch(
            chatSlice.actions.markConversationMessagesAsReadByUser({
              conversationId,
              userId,
            })
          );
          resolve(null);
        })
        .catch((e) => reject(e));
    });

  return { markMessageAsRead };
};

export default useMarkMessagesAsRead;
