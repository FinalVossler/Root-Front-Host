import React from "react";
import { IPageReadDto, ITheme } from "roottypes";

import Post from "../../components/appComponents/post";
import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import withChat from "../../hoc/withChat";
import { IPost } from "../../store/slices/postSlice";

import useStyles from "./dynamicPage.styles";

interface IDynamicPageProps {}

const DynamicPage: React.FunctionComponent<IDynamicPageProps> = (
  props: IDynamicPageProps
) => {
  const { pageSlug } = useParams();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const page: IPageReadDto | undefined = useAppSelector(
    (state) => state.page.pages
  ).find((page) => page.slug === pageSlug);
  const homePage: IPageReadDto | undefined = useAppSelector(
    (state) => state.page.pages
  ).find((page) => page.slug.length === 0);

  const styles = useStyles({ theme });

  const actualPage = page || homePage;
  if (!actualPage) return null;

  return (
    <div className={styles.dynamicPageContainer}>
      {actualPage.posts.map((post, index) => {
        return <Post key={index} post={post as IPost} />;
      })}
    </div>
  );
};

// When we are logged in, we don't want the additional initialization calls of withChat and withWrapper when we visit a dynamic page.
// These calls are already managed inside AuthenticatedApp.
// It follows that we don't want to export this component with withChat and withWrapper
export const DynamicPageForLoggedIn = React.memo(DynamicPage);

export default withChat(
  withWrapper(React.memo(DynamicPage), {
    withFooter: false,
    withSideMenu: true,
  })
);
