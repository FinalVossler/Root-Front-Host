import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Theme } from "../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  chatSlice,
  getConversationConversationalistsFromConversationId,
} from "../../../store/slices/chatSlice";
import { IUser } from "../../../store/slices/userSlice";

import useStyles from "./ChatBoxParticipants.styles";
import { BoxType } from "../chatBox/ChatBox";
import usegetContactsByIds from "../../../hooks/apiHooks/useGetContactsByIds";
import ChatBoxParticipantsOptions from "../chatBoxParticipantsOptions";

interface IChatBox {
  conversationId: string;
  boxType: BoxType;
}

const ChatBox: React.FunctionComponent<IChatBox> = (props: IChatBox) => {
  //#region Store
  const user: IUser = useAppSelector((state) => state.user.user);
  const contacts: IUser[] = useAppSelector((state) => state.chat.contacts);
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const [otherParticipants, setOtherParticipants] = React.useState<IUser[]>([]);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  //#endregion Store

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const { getContactsByIds } = usegetContactsByIds();

  //#region Effects
  React.useEffect(() => {
    if (props.conversationId) {
      const participantsIds =
        getConversationConversationalistsFromConversationId(
          props.conversationId
        ).filter((id) => id !== user._id);

      if (participantsIds.length > 0) {
        getContactsByIds(participantsIds).then((users: IUser[]) =>
          setOtherParticipants(users)
        );
      }
    }
  }, [props.boxType, props.conversationId, contacts]);
  //#endregion Effects

  //#region Listeners
  const handleBackArrowClick = () => {
    dispatch(chatSlice.actions.setSelectedConversationId(undefined));
  };
  //#endregion Listeners

  return (
    <div className={styles.chatBoxParticipantsContainer}>
      {props.boxType === BoxType.FullPageBox && (
        <AiOutlineArrowLeft
          className={styles.backArrow}
          onClick={handleBackArrowClick}
        />
      )}

      {otherParticipants.map((participant: IUser) => {
        return (
          <div
            onClick={() => setShowOptions(true)}
            className={styles.participantContainer}
            key={participant._id}
          >
            {!participant.profilePicture?.url && (
              <CgProfile className={styles.avatar}></CgProfile>
            )}
            {participant.profilePicture?.url && (
              <img
                className={styles.avatar}
                src={participant.profilePicture.url}
              />
            )}
            <span className={styles.participantName}>
              {participant.firstName + " " + participant.lastName}
            </span>
          </div>
        );
      })}

      <ChatBoxParticipantsOptions
        show={showOptions}
        setShowOptions={setShowOptions}
        conversationId={props.conversationId}
      />
    </div>
  );
};

export default React.memo(ChatBox);
