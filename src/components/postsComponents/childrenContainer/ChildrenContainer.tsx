import React from "react";

import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";
import Post from "../../fundamentalComponents/post";

import useStyles from "./childrenContainer.styles";
import { ITheme } from "roottypes";

interface IChildrenContainerProps {
  post: IPost;
}
const ChildrenContainer: React.FunctionComponent<IChildrenContainerProps> = (
  props: IChildrenContainerProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  return (
    <div className={styles.childrenContainer}>
      {props.post.children.map((child, index) => {
        return <Post post={child as IPost} key={index} />;
      })}
    </div>
  );
};

export default React.memo(ChildrenContainer);
