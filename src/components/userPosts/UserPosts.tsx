import { AxiosResponse } from "axios";
import React from "react";
import ReactLoading from "react-loading";

import { Theme } from "../../config/theme";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice, PostVisibility } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./userPosts.styles";
import PostsGetCommandd from "../../globalTypes/commands/PostsGetCommand";
import Post from "../post";
import PostWrapper from "../postWrappers/postWrapper";

interface IUserPosts {
  user: IUser;
  visibilities?: PostVisibility[];
}
const UserPosts: React.FunctionComponent<IUserPosts> = (props: IUserPosts) => {
  const posts: IPost[] | undefined = useAppSelector(
    (state) =>
      state.post.userPosts.find((p) => p.user._id === props.user._id)?.posts
  );

  const [postsLoading, setPostsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();

  const axios = useAuthorizedAxios();

  React.useEffect(() => {
    if (!props.user._id) return;

    setPostsLoading(true);

    const command: PostsGetCommandd = {
      userId: props.user._id,
      visibilities: props.visibilities || [
        PostVisibility.Public,
        PostVisibility.Private,
        PostVisibility.Connections,
      ],
      paginationCommand: {
        page,
        limit: 10,
      },
    };
    axios
      .request<AxiosResponse<PaginationResponse<IPost>>>({
        method: "POST",
        url: "/posts/getUserPosts",
        data: command,
      })
      .then((res) => {
        dispatch(
          postSlice.actions.refreshUserPosts({
            posts: res.data.data.data,
            user: props.user,
            total: res.data.data.total,
          })
        );
      })
      .finally(() => setPostsLoading(false));
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
