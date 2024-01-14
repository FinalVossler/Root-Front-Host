import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";

import { ITheme } from "../../config/theme";
import { IPost, PostDesign } from "../../store/slices/postSlice";
import extractContentFromHtml from "../../utils/extractContentFromHtml";

import ChildrenContainer from "../postsComponents/childrenContainer";
import Spacing from "../spacing";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../store/hooks";
import RotatingCard from "../postsComponents/rotatingCard";
import Banner from "../postsComponents/banner";
import TitleTextAndImage from "../postsComponents/titleTextAndImage";
import TitleAndText from "../postsComponents/titleAndText";
import Card from "../postsComponents/card";
import AnimatedTitle from "../postsComponents/animatedTitle";
import UnderlinedTitle from "../postsComponents/underlinedTitle";
import Footer from "../postsComponents/footer";
import extractLinksFromText from "../../utils/extractLinksFromText";
import ContactForm from "../contactForm";
import Person from "../postsComponents/Person";
import Card2 from "../postsComponents/card2";
import Video from "../postsComponents/video";
import PostAsEntityEditor from "../postsComponents/postAsEntityEditor";

import useStyles from "./post.styles";
import EntitiesList from "../../pages/entitiesPage/entitiesList";
import FullWidthPicture from "../postsComponents/fullWidthPicture";

interface IUserPostsProps {
  post: IPost;
}
const UserPosts: React.FunctionComponent<IUserPostsProps> = (
  props: IUserPostsProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  const getTranslatedText = useGetTranslatedText();

  const post = props.post;

  const socialMediaLinks: string[] = React.useMemo(
    () =>
      extractLinksFromText(
        extractContentFromHtml(getTranslatedText(post.content))
      ),
    [post.content]
  );

  let description: string = React.useMemo(
    () => extractContentFromHtml(getTranslatedText(post.content)),
    [post.content]
  );

  if (post.design === PostDesign.ModelForm) {
    return <PostAsEntityEditor post={post} />;
  }
  if (post.design === PostDesign.ModelList && Boolean(post.code)) {
    return <EntitiesList modelId={post.code || ""} />;
  }

  if (post.design === PostDesign.Card) {
    return (
      <Card
        backgroundImage={
          post.files.find((file) => file.isImage)?.url ||
          "assets/images/card4.jpeg"
        }
        description={description}
        title={getTranslatedText(post.title)}
        key={post._id}
      />
    );
  }

  if (post.design === PostDesign.fullWidthPicture) {
    return (
      <FullWidthPicture
        pictureUrl={post.files.find((f) => f.isImage)?.url || ""}
      />
    );
  }

  if (post.design === PostDesign.TitleAndText) {
    return (
      <TitleAndText
        description={description}
        title={getTranslatedText(post.title)}
      />
    );
  }
  if (post.design === PostDesign.Banner) {
    return (
      <Banner description={description} title={getTranslatedText(post.title)} />
    );
  }
  if (post.design === PostDesign.TitleImageAndText) {
    return (
      <TitleTextAndImage
        title={getTranslatedText(post.title)}
        description={description}
        imageUrl={post.files.find((file) => file.isImage)?.url}
      />
    );
  }
  if (post.design === PostDesign.ChildrenContainer) {
    return <ChildrenContainer post={post} />;
  }
  if (post.design === PostDesign.Spacing) {
    return (
      <Spacing height={post.code ? post.code : getTranslatedText(post.title)} />
    );
  }
  if (post.design === PostDesign.RotatingCarzd) {
    return (
      <RotatingCard
        description={description}
        title={getTranslatedText(post.title)}
        imageUrl={post.files.find((file) => file.isImage)?.url}
      />
    );
  }
  if (post.design === PostDesign.AnimatedTitle) {
    return <AnimatedTitle title={getTranslatedText(post.title)} />;
  }
  if (post.design === PostDesign.UnderlinedTitle) {
    return <UnderlinedTitle title={getTranslatedText(post.title)} />;
  }
  if (post.design === PostDesign.Footer) {
    let descriptionWithoutLinks: string = extractContentFromHtml(
      getTranslatedText(post.content)
    );
    socialMediaLinks.forEach((link) => {
      descriptionWithoutLinks = descriptionWithoutLinks.replace(link, "");
    });
    return (
      <Footer
        title={getTranslatedText(post.title)}
        description={descriptionWithoutLinks}
        facebook={socialMediaLinks.find((el) => el.indexOf("facebook") !== -1)}
        instagram={socialMediaLinks.find(
          (el) => el.indexOf("instagram") !== -1
        )}
        linkedin={socialMediaLinks.find((el) => el.indexOf("linkedin") !== -1)}
        youtube={socialMediaLinks.find((el) => el.indexOf("youtube") !== -1)}
      />
    );
  }
  if (post.design === PostDesign.ContactForm) {
    return <ContactForm post={post} />;
  }
  if (post.design === PostDesign.Person) {
    return (
      <Person
        cvLink={post.files.find((file) => !file.isImage)?.url}
        name={getTranslatedText(post.title)}
        description={extractContentFromHtml(getTranslatedText(post.content))}
        occupation={getTranslatedText(post.subTitle)}
        picture={post.files.find((file) => file.isImage)?.url}
      />
    );
  }
  if (post.design === PostDesign.Card2) {
    return (
      <Card2
        title={getTranslatedText(post.title)}
        backgroundImage={post.files.find((file) => file.isImage)?.url}
        description={extractContentFromHtml(getTranslatedText(post.content))}
      />
    );
  }
  if (post.design === PostDesign.Video) {
    return (
      <Video
        title={getTranslatedText(post.title)}
        videoId={getTranslatedText(post.subTitle)}
      />
    );
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
                rel="noreferrer"
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
