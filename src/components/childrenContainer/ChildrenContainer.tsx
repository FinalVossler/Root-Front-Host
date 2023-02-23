import React from "react";
import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";
import { IPost } from "../../store/slices/postSlice";
import Post from "../post";

import useStyles from "./childrenContainer.styles";

interface IChildrenContainer {
  post: IPost;
}
const UserPosts: React.FunctionComponent<IChildrenContainer> = (
  props: IChildrenContainer
) => {
  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <div className={styles.childrenContainer}>
      {props.post.children.map((child, index) => (
        <Post post={child} key={index} />
      ))}
    </div>
  );
};

export default React.memo(UserPosts);
