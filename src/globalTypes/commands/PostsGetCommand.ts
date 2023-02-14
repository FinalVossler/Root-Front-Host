import { PostVisibility } from "../../store/slices/postSlice";
import PaginationCommand from "../PaginationCommand";

type PostsGetCommand = {
  userId: string;
  visibilities: PostVisibility[];
  paginationCommand: PaginationCommand;
};

export default PostsGetCommand;
