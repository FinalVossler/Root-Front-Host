import React from "react";

import PostOptions from "../postOptions";

import { useAppSelector } from "../../../../store/hooks";
import { IPost } from "../../../../store/slices/postSlice";

import useStyles from "./postWrapper.styles";
import { ITheme } from "roottypes";

interface IPostWrapperProps {
  post: IPost;
}

const PostWrapper: React.FunctionComponent<
  React.PropsWithChildren<IPostWrapperProps>
> = (props: React.PropsWithChildren<IPostWrapperProps>) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.postWrapperContainer}>
      <PostOptions post={props.post} />
      {props.children}
    </div>
  );
};

export default PostWrapper;
