import { IPost } from "../../store/slices/postSlice";
import PaginationCommand from "../PaginationCommand";

type PostsSearchCommand = {
  title: IPost["title"];
  visibilities: IPost["visibility"][];
  posterId: IPost["posterId"];
  paginationCommand: PaginationCommand;
};

export default PostsSearchCommand;
