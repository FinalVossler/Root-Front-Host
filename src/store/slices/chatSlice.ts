import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";

export interface IMessage {
  _id: string;
  from: string;
  to: string[];
  message: string;
}

export type MessageSendCommand = {
  from: IMessage["from"];
  to: IMessage["to"];
  message: IMessage["message"];
};

export type Conversation = {
  // The id of a conversation is the joined state of the sorter array of the conversationalist's ids
  id: string;
  messages: IMessage[];
};

interface IChatState {
  contacts: IUser[];
  selectedContactId?: string;
  conversations: Conversation[];
}

const initialState: IChatState = {
  contacts: [],
  selectedContactId: undefined,
  conversations: [],
};

export const chatSlice = createSlice({
  name: "chat",
  reducers: {
    setContacts: (state: IChatState, action: PayloadAction<IUser[]>) => {
      state.contacts = action.payload;
    },
    setSelectedContactID: (
      state: IChatState,
      action: PayloadAction<string | undefined>
    ) => {
      state.selectedContactId = action.payload;
    },
    addMessages: (
      state: IChatState,
      action: PayloadAction<{ messages: IMessage[]; new: boolean }>
    ) => {
      const messages: IMessage[] = action.payload.messages;
      if (messages.length === 0) return;

      const fetchingNew: boolean = action.payload.new;

      const conversationId: string = messages[0].to.sort().join();
      const conversation: Conversation | undefined = state.conversations.find(
        (el) => el.id === conversationId
      );

      if (conversation) {
        // only add new messages
        messages.forEach((message) => {
          if (!conversation.messages.some((el) => el._id === message._id)) {
            if (fetchingNew) {
              conversation.messages.push(message);
            } else {
              conversation.messages.unshift(message);
            }
          }
        });
      } else {
        const newConversation: Conversation = {
          id: conversationId,
          messages,
        };
        state.conversations.push(newConversation);
      }
    },
  },
  initialState,
});

export default chatSlice.reducer;
