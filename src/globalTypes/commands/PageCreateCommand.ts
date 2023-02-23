import { IPage } from "../../store/slices/pageSlice";

type PageCreateCommand = {
  title: IPage["title"];
  posts: string[];
};

export default PageCreateCommand;
