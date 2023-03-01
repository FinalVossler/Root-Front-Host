import { Theme } from "../../config/theme";
import Header from "../../components/header";
import Footer from "../../components/footer";

import useStyles from "./withWrapper.styles";
import { useAppSelector } from "../../store/hooks";

const withWrapper =
  (Component: any, withFooter: boolean = true): React.FunctionComponent<any> =>
  (props: any) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const styles = useStyles({ theme });

    return (
      <div className={styles.withWrapperContainer}>
        <Header />
        <Component {...props} />
        {withFooter && <Footer />}
      </div>
    );
  };
export default withWrapper;
