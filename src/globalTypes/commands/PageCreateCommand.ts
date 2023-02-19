import { IPage } from "../../store/slices/pageSlice";

type PageCreateCommand = {
  title: IPage["title"];
  orderedPosts: string[];
};

export default PageCreateCommand;
