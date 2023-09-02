import React from "react";

import Post from "../../components/post";
import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";
import { IPage } from "../../store/slices/pageSlice";

import useStyles from "./dynamicPage.styles";
import { useParams } from "react-router-dom";

interface IDynamicPage {}

const DynamicPage: React.FunctionComponent<IDynamicPage> = (
  props: IDynamicPage
) => {
  const { pageSlug } = useParams();

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const page: IPage | undefined = useAppSelector(
    (state) => state.page.pages
  ).find((page) => page.slug === pageSlug);

  const styles = useStyles({ theme });

  if (!page) return null;

  return (
    <div className={styles.dynamicPageContainer}>
      {page.posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};

export default withWrapper(React.memo(DynamicPage), {
  withFooter: false,
  withSideMenu: true,
});
