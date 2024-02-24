import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { ITheme } from "../../../../config/theme";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  chatSlice,
  getConversationConversationalistsFromConversationId,
} from "../../../../store/slices/chatSlice";

import useStyles from "./ChatBoxParticipants.styles";
import { BoxType } from "../chatBox/ChatBox";
import usegetContactsByIds from "../../../../hooks/apiHooks/useGetContactsByIds";
import ChatBoxParticipantsOptions from "../chatBoxParticipantsOptions";
import { IFileReadDto, IUserReadDto } from "roottypes";

interface IChatBoxParticipantsProps {
  conversationId: string;
  boxType: BoxType;
}

const ChatBoxParticipants: React.FunctionComponent<
  IChatBoxParticipantsProps
> = (props: IChatBoxParticipantsProps) => {
  //#region Store
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const contacts: IUserReadDto[] = useAppSelector(
    (state) => state.chat.contacts
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const [otherParticipants, setOtherParticipants] = React.useState<
    IUserReadDto[]
  >([]);
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
        getContactsByIds(participantsIds).then((users: IUserReadDto[]) =>
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

      {otherParticipants.map((participant: IUserReadDto) => {
        return (
          <div
            onClick={() => setShowOptions(true)}
            className={styles.participantContainer}
            key={participant._id}
          >
            {!(participant.profilePicture as IFileReadDto)?.url && (
              <CgProfile className={styles.avatar}></CgProfile>
            )}
            {(participant.profilePicture as IFileReadDto)?.url && (
              <img
                className={styles.avatar}
                src={(participant.profilePicture as IFileReadDto).url}
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

export default React.memo(ChatBoxParticipants);
