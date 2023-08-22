import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IFile from "../../globalTypes/IFile";
import compareWithCreatedAt from "../../utils/compareWithCreatedAt";
import { IUser, UserWithLastReadMessageInConversation } from "./userSlice";
import SocketTypingStateCommand from "../../globalTypes/SocketTypingStateCommand";

export interface IMessage {
  _id: string;
  from: string;
  to: string[];
  message: string;
  read: string[];
  files: IFile[];
  reactions?: IReaction[];

  createdAt: string;
  updatedAt: string;
}

export interface IPopulatedMessage {
  _id: string;
  from: IUser;
  to: IUser[];
  message: string;
  read: string[];
  files: IFile[];
  reactions?: IReaction[];
  totalUnreadMessages?: number;

  createdAt: string;
  updatedAt: string;
}

export const populatedMessageToMessage = (
  populated: IPopulatedMessage
): IMessage => {
  return {
    _id: populated._id,
    createdAt: populated.createdAt,
    files: populated.files,
    from: populated.from._id,
    message: populated.message,
    read: populated.read,
    to: populated.to.map((el) => el._id.toString()),
    updatedAt: populated.updatedAt,
    reactions: populated.reactions,
  };
};

export type Conversation = {
  // The id of a conversation is the joined state of the sorter array of the conversationalist's ids
  id: string;
  messages: IMessage[];
  totalUnreadMessages: number;
  typingUsers?: IUser[];
  usersWithLastReadMessageInConversation?: UserWithLastReadMessageInConversation[];
};

export interface IReaction {
  _id?: string;
  user: IUser;
  reaction: ReactionEnum;

  createdAt: string;
  updatedAt: string;
}

export enum ReactionEnum {
  Love = "Love",
  Laugh = "Laugh",
  Shock = "Shock",
  Cry = "Cry",
  Angry = "Angry",
}

interface IChatState {
  contacts: IUser[];
  totalContacts: number;
  contactsPage: number;
  // For the chat page
  selectedConversationId?: string;
  selectedConversationIds?: string[];
  conversations: Conversation[];
  lastConversationsLastMessages: IPopulatedMessage[];
  totalLastConversationsLastMessages: number;
  alreadyLoadedLastConversationsLastMessagesFromBackend: boolean;
  totalUnreadMessages: number;
}

const initialState: IChatState = {
  contacts: [],
  totalContacts: 0,
  contactsPage: 1,
  selectedConversationId: undefined,
  selectedConversationIds: [],
  conversations: [],
  lastConversationsLastMessages: [],
  totalLastConversationsLastMessages: 0,
  alreadyLoadedLastConversationsLastMessagesFromBackend: false,
  totalUnreadMessages: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state: IChatState, action: PayloadAction<IUser[]>) => {
      state.contacts = action.payload;
    },
    setContactsPage: (state: IChatState, action: PayloadAction<number>) => {
      const page: number = action.payload;
      state.contactsPage = page;
    },
    setContactsTotal: (state: IChatState, action: PayloadAction<number>) => {
      const total: number = action.payload;
      state.totalContacts = total;
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

      state.totalUnreadMessages += action.payload.by;

      // Open the small chat box when we receive a new message
      if (state.selectedConversationIds?.indexOf(conversationId) === -1) {
        state.selectedConversationIds.push(conversationId);
      }
    },
    addMessages: (
      state: IChatState,
      action: PayloadAction<{
        messages: IMessage[];
        currentUser: IUser;
        populatedMessages: IPopulatedMessage[];
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

      // Add the conversation to the selected conversations for the popping up of a new chatbox in the app
      if (
        messages[messages.length - 1].from !== action.payload.currentUser._id
      ) {
        if (state.selectedConversationIds?.indexOf(conversationId) === -1) {
          state.selectedConversationIds?.push(conversationId);
        }
        if (!state.selectedConversationIds) {
          state.selectedConversationIds = [conversationId];
        }
      }

      // Add the message to the last conversation's last messages array
      if (
        action.payload.populatedMessages.length ===
        action.payload.messages.length
      ) {
        const indexOfLastConversationLastMessageFound: number =
          state.lastConversationsLastMessages.findIndex(
            (m) =>
              getConversationId([...m.to.map((el) => el._id.toString())]) ===
              conversationId
          );

        const populatedMessageToAdd: IPopulatedMessage =
          action.payload.populatedMessages[messages.length - 1];

        if (indexOfLastConversationLastMessageFound >= 0) {
          state.lastConversationsLastMessages.splice(
            indexOfLastConversationLastMessageFound,
            1
          );
        }

        state.lastConversationsLastMessages.unshift(populatedMessageToAdd);
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
          if (message.read.indexOf(action.payload.userId) === -1) {
            message.read.push(action.payload.userId);
          }
        });
        conversation.totalUnreadMessages = 0;
      }

      state.conversations = state.conversations.map(
        (conversation) => conversation
      );
    },
    setLastConversationsLastMessages: (
      state: IChatState,
      action: PayloadAction<{ messages: IPopulatedMessage[]; total: number }>
    ) => {
      const { messages, total } = action.payload;

      state.lastConversationsLastMessages = messages;
      state.totalLastConversationsLastMessages = total;
    },
    setAlreadyLoadedConversationsLastMessagesToTrue: (state: IChatState) => {
      state.alreadyLoadedLastConversationsLastMessagesFromBackend = true;
    },
    addSelectedConversation: (
      state: IChatState,
      action: PayloadAction<{ conversationId: string }>
    ) => {
      const conversationId: string = action.payload.conversationId;
      if (state.selectedConversationIds?.indexOf(conversationId) === -1) {
        state.selectedConversationIds?.push(conversationId);
      }
      if (!state.selectedConversationIds) {
        state.selectedConversationIds = [conversationId];
      }
    },
    unselectConversation: (
      state: IChatState,
      action: PayloadAction<{ conversationId: string }>
    ) => {
      const conversationId: string = action.payload.conversationId;
      state.selectedConversationIds =
        state.selectedConversationIds?.filter((id) => id !== conversationId) ||
        [];
    },
    unselectAllConversations: (state: IChatState) => {
      state.selectedConversationIds = [];
    },
    setUserTotalUnreadMessages: (
      state: IChatState,
      action: PayloadAction<number>
    ) => {
      state.totalUnreadMessages = action.payload;
    },
    addReactionToMessage: (
      state: IChatState,
      action: PayloadAction<{ reaction: IReaction; message: IMessage }>
    ) => {
      const conversation = state.conversations.find(
        (c) => c.id === getConversationId([...action.payload.message.to])
      );
      if (conversation) {
        const message = conversation.messages.find(
          (m) => m._id.toString() === action.payload.message._id.toString()
        );
        if (message) {
          message.reactions?.push(action.payload.reaction);
        }
      }
    },

    // Used after receiving a react notification
    markMessageAsUnread: (
      state: IChatState,
      action: PayloadAction<{ message: IMessage; user: IUser }>
    ) => {
      const conversation = state.conversations.find(
        (c) => c.id === getConversationId([...action.payload.message.to])
      );
      if (conversation) {
        const message = conversation.messages.find(
          (m) => m._id.toString() === action.payload.message._id.toString()
        );
        if (message) {
          message.read = message.read.filter(
            (el) => el.toString() !== action.payload.user._id.toString()
          );
        }
      }
    },
    setConversationUserTypingState: (
      state: IChatState,
      action: PayloadAction<SocketTypingStateCommand>
    ) => {
      const command = action.payload;
      const conversation = state.conversations.find(
        (c) => c.id == getConversationId([...command.toUsersIds])
      );
      if (conversation) {
        const foundTypingUser: boolean =
          conversation.typingUsers?.some(
            (u) => u._id.toString() === command.userId
          ) || false;
        if (command.isTyping && !foundTypingUser) {
          conversation.typingUsers = [
            ...(conversation.typingUsers || []),
            command.user,
          ];
        }
        if (!command.isTyping && foundTypingUser) {
          conversation.typingUsers = conversation.typingUsers?.filter((u) => {
            return u._id.toString() !== command.userId;
          });
        }
      }
    },
    setConversationUsersWithTheirLastReadMessage: (
      state: IChatState,
      action: PayloadAction<{
        conversationId: string;
        usersWithTheirLastReadMessageInConversation: UserWithLastReadMessageInConversation[];
      }>
    ) => {
      const conversation: Conversation | undefined = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (conversation) {
        conversation.usersWithLastReadMessageInConversation =
          action.payload.usersWithTheirLastReadMessageInConversation;
      }
    },
    updateConversationUserLastReadMessage: (
      state: IChatState,
      action: PayloadAction<{
        lastMarkedMessageAsRead: IMessage;
        by?: IUser;
        byId?: string;
      }>
    ) => {
      const conversation: Conversation | undefined = state.conversations.find(
        (c) =>
          c.id ===
          getConversationId([...action.payload.lastMarkedMessageAsRead.to])
      );
      if (conversation) {
        conversation.usersWithLastReadMessageInConversation =
          conversation.usersWithLastReadMessageInConversation?.map((el) =>
            el._id.toString() ===
            (action.payload.by?._id || action.payload.byId || "").toString()
              ? {
                  ...el,
                  lastReadMessageInConversation:
                    action.payload.lastMarkedMessageAsRead,
                }
              : el
          );
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
): string[] => {
  return conversationId.split(";;");
};

export default chatSlice.reducer;
