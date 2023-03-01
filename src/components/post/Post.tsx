import React from "react";
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
import Spacing from "../spacing";
import RotatingCard from "../rotatingCard";
import AnimatedTitle from "../animatedTitle";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";

interface IUserPosts {
  post: IPost;
}
const UserPosts: React.FunctionComponent<IUserPosts> = (props: IUserPosts) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const getTranslatedText = useGetTranslatedText();

  const post = props.post;

  if (post.design === PostDesign.Card) {
    return (
      <Card
        backgroundImage={
          post.files.find((file) => file.isImage)?.url ||
          "assets/images/card4.jpeg"
        }
        description={extractContentFromHtml(getTranslatedText(post.content))}
        title={getTranslatedText(post.title)}
        key={post._id}
      />
    );
  }
  if (post.design === PostDesign.TitleAndText) {
    return (
      <TitleAndText
        description={extractContentFromHtml(getTranslatedText(post.content))}
        title={getTranslatedText(post.title)}
      />
    );
  }
  if (post.design === PostDesign.Banner) {
    return (
      <Banner
        description={extractContentFromHtml(getTranslatedText(post.content))}
        title={getTranslatedText(post.title)}
      />
    );
  }
  if (post.design === PostDesign.TitleImageAndText) {
    return (
      <TitleTextAndImage
        title={getTranslatedText(post.title)}
        description={extractContentFromHtml(getTranslatedText(post.content))}
        imageUrl={post.files.find((file) => file.isImage)?.url}
      />
    );
  }
  if (post.design === PostDesign.ChildrenContainer) {
    return <ChildrenContainer post={post} />;
  }
  if (post.design === PostDesign.Spacing) {
    return <Spacing height={getTranslatedText(post.title)} />;
  }
  if (post.design === PostDesign.RotatingCarzd) {
    return (
      <RotatingCard
        description={extractContentFromHtml(getTranslatedText(post.content))}
        title={getTranslatedText(post.title)}
        imageUrl={post.files.find((file) => file.isImage)?.url}
      />
    );
  }
  if (post.design === PostDesign.AnimatedTitle) {
    return <AnimatedTitle title={getTranslatedText(post.title)} />;
  }

  return (
    <div className={styles.userPost}>
      {post.title && (
        <h2 className={styles.postTitle}>{getTranslatedText(post.title)}</h2>
      )}

      {post.content && getTranslatedText(post.content) !== "<p><br></p>" && (
        <p
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: getTranslatedText(post.content) }}
        ></p>
      )}

      {post.files.length > 0 && (
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
      )}
    </div>
  );
};

export default React.memo(UserPosts);
