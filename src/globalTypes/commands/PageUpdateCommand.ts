import { IPage } from "../../store/slices/pageSlice";

type PageUpdateCommand = {
  _id: string;
  title: IPage["title"];
  posts: string[];
};

export default PageUpdateCommand;
