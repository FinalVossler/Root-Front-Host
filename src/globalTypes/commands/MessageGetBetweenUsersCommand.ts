import PaginationCommand from "../PaginationCommand";

type MessageGetBetweenUsersCommand = {
  paginationCommand: PaginationCommand;
  usersIds: string[];
};

export default MessageGetBetweenUsersCommand;
