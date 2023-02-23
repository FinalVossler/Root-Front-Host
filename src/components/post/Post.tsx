import React from "react";
import { useTheme } from "react-jss";
import { AiOutlineFileDone } from "react-icons/ai";

import { Theme } from "../../config/theme";
import { IPost, PostDesign } from "../../store/slices/postSlice";
import extractContentFromHtml from "../../utils/extractContentFromHtml";

import useStyles from "./post.styles";
import Card from "../card";
import TitleAndText from "../titleAndText";
import Banner from "../banner";
import TitleTextAndImage from "../titleTextAndImage";
import ChildrenContainer from "../childrenContainer";

interface IUserPosts {
  post: IPost;
}
const UserPosts: React.FunctionComponent<IUserPosts> = (props: IUserPosts) => {
  const theme: Theme = useTheme();
  const styles = useStyles({ theme });

  const post = props.post;

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
  if (post.design === PostDesign.TitleImageAndText) {
    return (
      <TitleTextAndImage
        title={post.title}
        description={extractContentFromHtml(post.content || "")}
        imageUrl={post.files.find((file) => file.isImage)?.url}
      />
    );
  }
  if (post.design === PostDesign.ChildrenContainer) {
    return <ChildrenContainer post={post} />;
  }

  return (
    <div className={styles.userPost}>
      {post.title && <h2 className={styles.postTitle}>{post.title}</h2>}

      {post.content && post.content !== "<p><br></p>" && (
        <p
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
      )}

      <div className={styles.postFiles}>
        {post?.files?.map((file, index) => {
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
};

export default React.memo(UserPosts);
