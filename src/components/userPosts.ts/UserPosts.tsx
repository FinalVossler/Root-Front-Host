import { AxiosResponse } from "axios";
import React from "react";
import { useTheme } from "react-jss";
import ReactLoading from "react-loading";
import { AiOutlineFileDone } from "react-icons/ai";

import { Theme } from "../../config/theme";
import PaginationResponse from "../../globalTypes/PaginationResponse";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  IPost,
  PostDesign,
  postSlice,
  PostVisibility,
} from "../../store/slices/postSlice";
import { IUser } from "../../store/slices/userSlice";
import extractContentFromHtml from "../../utils/extractContentFromHtml";

import useStyles from "./userPosts.styles";
import PostsGetCommandd from "../../globalTypes/commands/PostsGetCommand";
import Card from "../card";
import TitleAndText from "../titleAndText";
import Banner from "../banner";

interface IUserPosts {
  userId: string;
  visibilities: PostVisibility[];
}
const UserPosts: React.FunctionComponent<IUserPosts> = (props: IUserPosts) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const posts: IPost[] | undefined = useAppSelector(
    (state) => state.post.userPosts.find((p) => p.user._id === user._id)?.posts
  );

  const [postsLoading, setPostsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);

  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();

  const axios = useAuthorizedAxios();

  React.useEffect(() => {
    if (!user._id) return;

    setPostsLoading(true);

    const command: PostsGetCommandd = {
      userId: props.userId,
      visibilities: props.visibilities,
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
          if (post.design === PostDesign.Card) {
            return (
              <Card
                backgroundImage={
                  post.files.find((file) => file.isImage)?.url ||
                  "assets/images/card4.jpeg"
                }
                description={extractContentFromHtml(post.content || "")}
                title={post.title || ""}
                key={post._id}
              />
            );
          }
          if (post.design === PostDesign.TitleAndText) {
            return (
              <TitleAndText
                description={extractContentFromHtml(post.content || "")}
                title={post.title || ""}
                key={post._id}
              />
            );
          }
          if (post.design === PostDesign.Banner) {
            return (
              <Banner
                description={extractContentFromHtml(post.content || "")}
                title={post.title || ""}
              />
            );
          }
          return (
            <div key={post._id} className={styles.userPost}>
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

export default React.memo(UserPosts);
