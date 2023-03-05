import { IPost } from "../../store/slices/postSlice";

type PostUpdateCommand = {
  _id: string;
  title?: string;
  subTitle?: string;
  content?: string;
  files: IPost["files"];
  visibility: IPost["visibility"];
  design: IPost["design"];
  children: IPost["children"];
  language: string;
};

export default PostUpdateCommand;
