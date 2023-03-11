import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import compareWithCreatedAt from "../../utils/compareWithCreatedAt";
import { IUser } from "./userSlice";

export interface IMessage {
  _id: string;
  from: string;
  to: string[];
  message: string;
  read: string[];
  files: IFile[];

  createdAt: string;
  updatedAt: string;
}

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
  initialState,
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

        state.conversations.push(conversation);
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
          conversation.messages.sort(compareWithCreatedAt(false));
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
    deleteMessage: (
      state: IChatState,
      action: PayloadAction<{ conversationId: string; messageId: string }>
    ) => {
      const conversation: Conversation | undefined = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (conversation) {
        conversation.messages = conversation.messages.filter(
          (m) => m._id !== action.payload.messageId
        );
      }
    },
    markConversationMessagesAsReadByUser: (
      state: IChatState,
      action: PayloadAction<{ conversationId: string; userId: string }>
    ) => {
      const conversation: Conversation | undefined = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (conversation) {
        conversation.messages.forEach((message) => {
          if (message.read.indexOf(action.payload.userId) === -1)
            message.read.push(action.payload.userId);
        });
      }
    },
  },
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

export default chatSlice.reducer;
