import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { Theme } from "../../config/theme";
import Header from "../../components/header";
import Footer from "../../components/postsComponents/footer";

import useStyles from "./withWrapper.styles";
import { useAppSelector } from "../../store/hooks";

const withWrapper =
  (
    Component: any,
    options: { withFooter: boolean } = { withFooter: true }
  ): React.FunctionComponent<any> =>
  (props: any) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const styles = useStyles({ theme });

    return (
      <div className={styles.withWrapperContainer}>
        <Header />
        <Component {...props} />
        {options.withFooter && <Footer />}
      </div>
    );
  };
export default withWrapper;
