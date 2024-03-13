import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";

import { IPost } from "../../../store/slices/postSlice";
import extractContentFromHtml from "../../../utils/extractContentFromHtml";

import ChildrenContainer from "../../fundamentalComponents/postsComponents/childrenContainer";
import Spacing from "../../fundamentalComponents/postsComponents/spacing";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import RotatingCard from "../../fundamentalComponents/postsComponents/rotatingCard";
import Banner from "../../fundamentalComponents/postsComponents/banner";
import TitleTextAndImage from "../../fundamentalComponents/postsComponents/titleTextAndImage";
import TitleAndText from "../../fundamentalComponents/postsComponents/titleAndText";
import Card from "../../fundamentalComponents/postsComponents/card";
import AnimatedTitle from "../../fundamentalComponents/postsComponents/animatedTitle";
import UnderlinedTitle from "../../fundamentalComponents/postsComponents/underlinedTitle";
import Footer from "../layoutComponents/footer";
import extractLinksFromText from "../../../utils/extractLinksFromText";
import ContactForm from "../formComponents/contactForm";
import Person from "../../fundamentalComponents/postsComponents/Person";
import Card2 from "../../fundamentalComponents/postsComponents/card2";
import Video from "../../fundamentalComponents/postsComponents/video";
import PostAsEntityEditor from "../postAsEntityEditor";

import useStyles from "./post.styles";
import EntitiesList from "../../../pages/entitiesPage/entitiesList";
import FullWidthPicture from "../../fundamentalComponents/postsComponents/fullWidthPicture";
import { IFileReadDto, PostDesignEnum } from "roottypes";
import { useAppSelector } from "../../../store/hooks";

interface IPostProps {
  post: IPost;
}
const Post: React.FunctionComponent<IPostProps> = (props: IPostProps) => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);

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

  if (post.design === PostDesignEnum.ModelForm) {
    return <PostAsEntityEditor post={post} />;
  }
  if (post.design === PostDesignEnum.ModelList && Boolean(post.code)) {
    return <EntitiesList modelId={post.code || ""} />;
  }

  if (post.design === PostDesignEnum.Card) {
    return (
      <Card
        backgroundImage={
          (post.files as IFileReadDto[]).find((file) => file.isImage)?.url ||
          "assets/images/card4.jpeg"
        }
        description={description}
        title={getTranslatedText(post.title)}
        key={post._id}
        theme={theme}
      />
    );
  }

  if (post.design === PostDesignEnum.fullWidthPicture) {
    return (
      <FullWidthPicture
        pictureUrl={
          (post.files as IFileReadDto[]).find((f) => f.isImage)?.url || ""
        }
        theme={theme}
      />
    );
  }

  if (post.design === PostDesignEnum.TitleAndText) {
    return (
      <TitleAndText
        theme={theme}
        description={description}
        title={getTranslatedText(post.title)}
      />
    );
  }
  if (post.design === PostDesignEnum.Banner) {
    return (
      <Banner
        theme={theme}
        description={description}
        title={getTranslatedText(post.title)}
      />
    );
  }
  if (post.design === PostDesignEnum.TitleImageAndText) {
    return (
      <TitleTextAndImage
        theme={theme}
        title={getTranslatedText(post.title)}
        description={description}
        imageUrl={
          (post.files as IFileReadDto[]).find((file) => file.isImage)?.url
        }
      />
    );
  }
  if (post.design === PostDesignEnum.ChildrenContainer) {
    return <ChildrenContainer theme={theme} post={post} />;
  }
  if (post.design === PostDesignEnum.Spacing) {
    return (
      <Spacing
        theme={theme}
        height={post.code ? post.code : getTranslatedText(post.title)}
      />
    );
  }
  if (post.design === PostDesignEnum.RotatingCarzd) {
    return (
      <RotatingCard
        theme={theme}
        description={description}
        title={getTranslatedText(post.title)}
        imageUrl={
          (post.files as IFileReadDto[]).find((file) => file.isImage)?.url
        }
      />
    );
  }
  if (post.design === PostDesignEnum.AnimatedTitle) {
    return (
      <AnimatedTitle theme={theme} title={getTranslatedText(post.title)} />
    );
  }
  if (post.design === PostDesignEnum.UnderlinedTitle) {
    return (
      <UnderlinedTitle theme={theme} title={getTranslatedText(post.title)} />
    );
  }
  if (post.design === PostDesignEnum.Footer) {
    let descriptionWithoutLinks: string = extractContentFromHtml(
      getTranslatedText(post.content)
    );
    socialMediaLinks.forEach((link) => {
      descriptionWithoutLinks = descriptionWithoutLinks.replace(link, "");
    });
    return (
      <Footer
        theme={theme}
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
  if (post.design === PostDesignEnum.ContactForm) {
    return <ContactForm post={post} />;
  }
  if (post.design === PostDesignEnum.Person) {
    return (
      <Person
        theme={theme}
        cvLink={
          (post.files as IFileReadDto[]).find((file) => !file.isImage)?.url
        }
        name={getTranslatedText(post.title)}
        description={extractContentFromHtml(getTranslatedText(post.content))}
        occupation={getTranslatedText(post.subTitle)}
        picture={
          (post.files as IFileReadDto[]).find((file) => file.isImage)?.url
        }
      />
    );
  }
  if (post.design === PostDesignEnum.Card2) {
    return (
      <Card2
        theme={theme}
        title={getTranslatedText(post.title)}
        backgroundImage={
          (post.files as IFileReadDto[]).find((file) => file.isImage)?.url
        }
        description={extractContentFromHtml(getTranslatedText(post.content))}
      />
    );
  }
  if (post.design === PostDesignEnum.Video) {
    return (
      <Video
        theme={theme}
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
          {(post?.files as IFileReadDto[])?.map((file, index) => {
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

export default React.memo(Post);
