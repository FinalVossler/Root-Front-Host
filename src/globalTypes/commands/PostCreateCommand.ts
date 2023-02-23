import { IPost } from "../../store/slices/postSlice";

type PostCreateCommand = {
  title?: IPost["title"];
  posterId: IPost["posterId"];
  content?: IPost["content"];
  files: IPost["files"];
  visibility: IPost["visibility"];
  design: IPost["design"];
  children: string[];
};

export default PostCreateCommand;
