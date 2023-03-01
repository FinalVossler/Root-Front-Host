import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IPost } from "../../store/slices/postSlice";
import Post from "../post";

import useStyles from "./childrenContainer.styles";

interface IChildrenContainer {
  post: IPost;
}
const UserPosts: React.FunctionComponent<IChildrenContainer> = (
  props: IChildrenContainer
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  return (
    <div className={styles.childrenContainer}>
      {props.post.children.map((child, index) => {
        return <Post post={child} key={index} />;
      })}
    </div>
  );
};

export default React.memo(UserPosts);
