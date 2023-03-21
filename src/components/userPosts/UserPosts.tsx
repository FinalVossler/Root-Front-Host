import React from "react";
import ReactLoading from "react-loading";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import { IPost, PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./userPosts.styles";
import Post from "../post";
import PostWrapper from "../postWrappers/postWrapper";
import useGetPosts, { PostsGetCommand } from "../../hooks/apiHooks/useGetPosts";

interface IUserPosts {
  user: IUser;
  visibilities?: PostVisibility[];
}
const UserPosts: React.FunctionComponent<IUserPosts> = (props: IUserPosts) => {
  const posts: IPost[] | undefined = useAppSelector(
    (state) =>
      state.post.userPosts.find((p) => p.user._id === props.user._id)?.posts
  );

  const [page, setPage] = React.useState(1);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const { getPosts, loading: postsLoading } = useGetPosts();

  React.useEffect(() => {
    if (!props.user._id) return;

    const command: PostsGetCommand = {
      userId: props.user._id,
      visibilities: props.visibilities || [
        PostVisibility.Public,
        PostVisibility.Private,
        PostVisibility.Connections,
      ],
      paginationCommand: {
        page,
        limit: 30,
      },
    };
    getPosts(command, props.user);
  }, [props.user]);

  if (posts?.length === 0) return null;

  return (
    <div className={styles.userPostsContainer}>
      {postsLoading && <ReactLoading />}

      {!postsLoading &&
        posts?.map((post: IPost) => (
          <PostWrapper key={post._id} post={post}>
            <Post post={post} />
          </PostWrapper>
        ))}
    </div>
  );
};

export default React.memo(UserPosts);