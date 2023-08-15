import { IUser } from "../store/slices/userSlice";

export type SocketTypingStateCommand = {
  userId: string;
  user: IUser;
  toUsersIds: string[];
  isTyping: boolean;
};

export default SocketTypingStateCommand;
