import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./userSlice";

export interface IMessage {
  _id: string;
  from: string;
  to: string[];
  message: string;
  read: string[];
  createdAt: string;
  updatedAt: string;
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
  totalUnreadMessages: number;
};

interface IChatState {
  contacts: IUser[];
  selectedConversationId?: string;
  conversations: Conversation[];
}

const initialState: IChatState = {
  contacts: [],
  selectedConversationId: undefined,
  conversations: [],
};

export const chatSlice = createSlice({
  name: "chat",
  reducers: {
    setContacts: (state: IChatState, action: PayloadAction<IUser[]>) => {
      state.contacts = action.payload;
    },
    setSelectedConversationId: (
      state: IChatState,
      action: PayloadAction<string | undefined>
    ) => {
      state.selectedConversationId = action.payload;
      if (action.payload) {
        const conversation: Conversation | undefined = state.conversations.find(
          (el) => el.id === action.payload
        );
        if (conversation) {
          conversation.totalUnreadMessages = 0;
        } else {
          const newConversation: Conversation = {
            id: action.payload,
            messages: [],
            totalUnreadMessages: 0,
          };
          state.conversations.push(newConversation);
        }
      }
    },
    addConversation: (
      state: IChatState,
      action: PayloadAction<Conversation>
    ) => {
      state.conversations.push(action.payload);
    },
    setConversationTotalUnreadMessages: (
      state: IChatState,
      action: PayloadAction<{ usersIds: string[]; totalUnreadMessages: number }>
    ) => {
      const conversationId: string = getConversationId([
        ...action.payload.usersIds,
      ]);
      let conversation: Conversation | undefined = state.conversations.find(
        (el) => el.id === conversationId
      );
      if (conversation) {
        conversation.totalUnreadMessages = action.payload.totalUnreadMessages;
      } else {
        conversation = {
          id: conversationId,
          messages: [],
          totalUnreadMessages: action.payload.totalUnreadMessages,
        };
      }
    },
    incrementConversationTotalUnreadMessages: (
      state: IChatState,
      action: PayloadAction<{ usersIds: string[]; by: number }>
    ) => {
      const conversationId: string = getConversationId([
        ...action.payload.usersIds,
      ]);

      // No need to increment when we already have the conversation selected
      if (conversationId === state.selectedConversationId) return;

      let conversation: Conversation | undefined = state.conversations.find(
        (el) => el.id === conversationId
      );
      if (conversation) {
        conversation.totalUnreadMessages += action.payload.by;
      } else {
        conversation = {
          id: conversationId,
          messages: [],
          totalUnreadMessages: action.payload.by,
        };
      }
    },
    addMessages: (
      state: IChatState,
      action: PayloadAction<{
        messages: IMessage[];
        currentUser: IUser;
      }>
    ) => {
      const messages: IMessage[] = action.payload.messages;
      if (messages.length === 0) return;

      const conversationId: string = getConversationId([...messages[0].to]);
      const conversation: Conversation | undefined = state.conversations.find(
        (el) => el.id === conversationId
      );

      if (conversation) {
        messages.forEach((message) => {
          if (!conversation.messages.some((el) => el._id === message._id)) {
            conversation.messages.push(message);
          }
          conversation.messages.sort(compare);
        });
      } else {
        const newConversation: Conversation = {
          id: conversationId,
          messages,
          totalUnreadMessages: 0,
        };
        state.conversations.push(newConversation);
      }
    },
  },
  initialState,
});

export const getConversationId = (
  conversationalists: (string | undefined)[]
) => {
  return conversationalists.sort().join(";;");
};

export const getConversationConversationalistsFromConversationId = (
  conversationId: string
) => {
  return conversationId.split(";;");
};

const compare = (a: IMessage, b: IMessage) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (a.createdAt > b.createdAt) {
    return 1;
  }

  return 0;
};

export default chatSlice.reducer;
