import { IPost } from "../../store/slices/postSlice";

type PostCreateCommand = {
  title?: string;
  subTitle?: string;
  posterId: IPost["posterId"];
  content?: string;
  files: IPost["files"];
  visibility: IPost["visibility"];
  design: IPost["design"];
  children: string[];
  language: string;
};

export default PostCreateCommand;
