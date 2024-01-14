import React from "react";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";
import Post from "../../post";

import useStyles from "./childrenContainer.styles";

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
        return <Post post={child} key={index} />;
      })}
    </div>
  );
};

export default React.memo(ChildrenContainer);
