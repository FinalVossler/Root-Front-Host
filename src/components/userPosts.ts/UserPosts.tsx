import { AxiosResponse } from "axios";
import React from "react";
import { useTheme } from "react-jss";
import ReactLoading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";

import { Theme } from "../../config/theme";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import PostVisibility from "../../globalTypes/PostVisibility";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IPost, postSlice } from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";

import useStyles from "./userPosts.styles";

interface IUserPosts {
  userId: string;
  visibilities: PostVisibility[];
}
const Banner: React.FunctionComponent<IUserPosts> = (props: IUserPosts) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const posts: IPost[] | undefined = useAppSelector(
    (state) => state.post.userPosts.find((p) => p.user._id === user._id)?.posts
  );

  console.log("posts", posts);

  const [postsLoading, setPostsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);

  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();

  const axios = useAuthorizedAxios();

  React.useEffect(() => {
    if (!user._id) return;

    setPostsLoading(true);
    axios
      .request<AxiosResponse<PaginationResponse<IPost>>>({
        method: "POST",
        url: "/posts/getUserPosts",
        data: {
          userId: props.userId,
          visibilities: props.visibilities,
          paginationCommand: {
            page,
            limit: 10,
          },
        },
      })
      .then((res) => {
        dispatch(
          postSlice.actions.refreshUserPosts({
            posts: res.data.data.data,
            user,
            total: res.data.data.total,
          })
        );
      })
      .finally(() => setPostsLoading(false));
  }, [user]);

  const styles = useStyles({ theme });

  if (posts?.length === 0) return null;

  return (
    <div className={styles.userPostsContainer}>
      {postsLoading && <ReactLoading />}

      {!postsLoading &&
        posts?.map((post: IPost, index: number) => {
          return (
            <div
              key={post._id}
              className={styles.userPost}
              style={{ marginBottom: index === posts.length - 1 ? 0 : 30 }}
            >
              {post.title && <h2 className={styles.postTitle}>{post.title}</h2>}

              {post.content && post.content !== "<p><br></p>" && (
                <p
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></p>
              )}

              <div className={styles.postFiles}>
                {post.files.map((file, index) => {
                  return (
                    <a
                      key={"postFile" + index}
                      className={styles.postFileContainer}
                      href={file.url}
                      target="_blank"
                    >
                      {file.isImage && (
                        <div
                          className={styles.postImage}
                          key={"postFile" + index}
                          style={{ backgroundImage: "url(" + file.url + ")" }}
                        />
                      )}
                      {!file.isImage && (
                        <AiOutlineFileDone className={styles.fileIcon} />
                      )}

                      <span className={styles.fileName}>{file.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(Banner);
