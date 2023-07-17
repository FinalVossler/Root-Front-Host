import React from "react";

import PostOptions from "../postOption";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";

import useStyles from "./postWrapper.styles";

interface IPostWrapper {
  post: IPost;
}

const PostWrapper: React.FunctionComponent<
  React.PropsWithChildren<IPostWrapper>
> = (props: React.PropsWithChildren<IPostWrapper>) => {
  const theme: Theme = useAppSelector(
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
