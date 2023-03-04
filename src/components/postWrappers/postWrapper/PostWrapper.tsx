import React from "react";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";

import useStyles from "./postWrapper.styles";

interface IPostWrapper extends React.PropsWithChildren {
  post: IPost;
}

const PostWrapper: React.FunctionComponent<IPostWrapper> = (
  props: IPostWrapper
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <div className={styles.postWrapperContainer} {...props}>
      {props.children}
    </div>
  );
};

export default PostWrapper;
