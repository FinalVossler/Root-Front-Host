import React from "react";
import { ITheme } from "roottypes";

import { IPost } from "../../../../store/slices/postSlice";
import Post from "../../../appComponents/post";

import useStyles from "./childrenContainer.styles";

interface IChildrenContainerProps {
  post: IPost;
  theme: ITheme;
}
const ChildrenContainer: React.FunctionComponent<IChildrenContainerProps> = (
  props: IChildrenContainerProps
) => {
  const styles = useStyles({ theme: props.theme });

  return (
    <div className={styles.childrenContainer}>
      {props.post.children.map((child, index) => {
        return <Post post={child as IPost} key={index} />;
      })}
    </div>
  );
};

export default React.memo(ChildrenContainer);
