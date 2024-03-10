import React from "react";
import { MdDelete, MdGroup } from "react-icons/md";

import useStyles from "./chatBoxPartipantsOptions.styles";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import {
  chatSlice,
  Conversation,
  getConversationId,
} from "../../../../store/slices/chatSlice";
import SearchInput from "../../../fundamentalComponents/inputs/searchInput";
import useSearchUsers from "../../../../hooks/apiHooks/useSearchUsers";
import { BiPlus } from "react-icons/bi";
import { ITheme, IUserReadDto } from "roottypes";

interface IChatBoxParticipantsOptionsProps {
  setShowOptions: (showOptions: boolean) => void;
  show: boolean;
  conversationId: string;
}

const ChatBoxParticipantsOptions: React.FunctionComponent<
  IChatBoxParticipantsOptionsProps
> = (props: IChatBoxParticipantsOptionsProps) => {
  //#region store
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.chat
  );
  const conversation: Conversation | undefined = useAppSelector(
    (state) => state.chat.conversations
  ).find((c) => c.id === props.conversationId);
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  //#endregion store

  //#region state
  const [createGroupSelected, setCreateGroupSelected] =
    React.useState<boolean>(false);
  const [newGroupParticipants, setNewGroupParticipants] = React.useState<
    IUserReadDto[]
  >(
    conversation?.usersWithLastReadMessageInConversation?.filter(
      (u) => u._id.toString() !== user._id.toString()
    ) || []
  );
  //#endregion state

  //#region hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const containerRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => props.setShowOptions(false));
  const { handleSearchUsersPromise } = useSearchUsers({
    setStoreAfterSearch: false,
  });
  const dispatch = useAppDispatch();
  //#endregion hooks

  //#region event listeners
  const handleSelectGroup = () => setCreateGroupSelected(!createGroupSelected);
  const handleSelectSearchedUser = (u: IUserReadDto) => {
    if (
      !newGroupParticipants.some((el) => el._id.toString() === u._id.toString())
    ) {
      setNewGroupParticipants([...newGroupParticipants, u]);
    }
  };
  const handleDeleteNewGroupParticipant = (u: IUserReadDto) => {
    const newNewGroupParticipants = newGroupParticipants.filter(
      (p) => p._id.toString() !== u._id.toString()
    );
    setNewGroupParticipants(newNewGroupParticipants);
  };
  const handleAddConversation = () => {
    const newConversationId: string = getConversationId(
      newGroupParticipants
        .map((el) => el._id.toString())
        .concat([user._id.toString()])
    );
    if (newConversationId !== props.conversationId) {
      dispatch(
        chatSlice.actions.addSelectedConversation({
          conversationId: newConversationId,
        })
      );
    }
    props.setShowOptions(false);
  };
  //#endregion event listeners

  React.useEffect(() => {
    setNewGroupParticipants(
      conversation?.usersWithLastReadMessageInConversation?.filter(
        (u) => u._id.toString() !== user._id.toString()
      ) || []
    );
  }, [conversation?.usersWithLastReadMessageInConversation]);

  if (!props.show) return null;

  return (
    <div
      ref={containerRef}
      className={styles.chatBoxParticipantsOptionsContainer}
    >
      <div
        className={createGroupSelected ? styles.selectedOption : styles.option}
        onClick={handleSelectGroup}
      >
        <MdGroup className={styles.chatOptionIcon} />
        <span>{getTranslatedText(staticText?.createGroup)}</span>
      </div>

      {createGroupSelected && (
        <div className={styles.groupCreationContainer}>
          <span className={styles.searchContactsLabel}>
            {getTranslatedText(staticText?.searchContacts)}:
          </span>
          <SearchInput
            getElementTitle={(u: IUserReadDto) =>
              u.firstName + " " + u.lastName
            }
            searchPromise={handleSearchUsersPromise}
            onElementClick={handleSelectSearchedUser}
          />

          {newGroupParticipants.map((participant, i) => (
            <span className={styles.newGroupParticipant} key={i}>
              {participant.firstName + " " + participant.lastName}
              <MdDelete
                onClick={() => handleDeleteNewGroupParticipant(participant)}
                className={styles.deleteNewGroupParticipantIcon}
              />
            </span>
          ))}

          {newGroupParticipants.length >= 2 && (
            <div className={styles.addConversationButtonContainer}>
              <BiPlus
                onClick={handleAddConversation}
                className={styles.addConversationButton}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBoxParticipantsOptions;
