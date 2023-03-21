import Post from "../../components/post";

import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";
import { IPage } from "../../store/slices/pageSlice";

import useStyles from "./dynamicPage.styles";

interface IDynamicPage {
  page: IPage;
}

const DynamicPage: React.FunctionComponent<IDynamicPage> = (
  props: IDynamicPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div className={styles.dynamicPageContainer}>
      {props.page.posts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};

export default withWrapper(DynamicPage, { withFooter: false });