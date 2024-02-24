import React from "react";
import ReactLoading from "react-loading";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import { IPost } from "../../../store/slices/postSlice";

import useStyles from "./userPosts.styles";
import Post from "../../fundamentalComponents/post";
import PostWrapper from "../postWrappers/postWrapper";
import useGetPosts from "../../../hooks/apiHooks/useGetPosts";
import { IPostsGetCommand, IUserReadDto, PostVisibilityEnum } from "roottypes";

interface IUserPostsProps {
  user: IUserReadDto;
  visibilities?: PostVisibilityEnum[];
}
const UserPosts: React.FunctionComponent<IUserPostsProps> = (
  props: IUserPostsProps
) => {
  const posts: IPost[] | undefined = useAppSelector(
    (state) =>
      state.post.userPosts.find((p) => p.user._id === props.user._id)?.posts
  );

  const [page, setPage] = React.useState(1);

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const { getPosts, loading: postsLoading } = useGetPosts();

  React.useEffect(() => {
    if (!props.user._id) return;

    const command: IPostsGetCommand = {
      userId: props.user._id,
      visibilities: props.visibilities || [
        PostVisibilityEnum.Public,
        PostVisibilityEnum.Private,
        PostVisibilityEnum.Connections,
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
    <div className={styles.userPostsContainer} data-cy="userPosts">
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
