import { useTheme } from "react-jss";

import { Theme } from "../../config/theme";
import Header from "../../components/header";
import Footer from "../../components/footer";

import useStyles from "./withWrapper.styles";

const withWrapper =
  (Component: any, withFooter: boolean = true): React.FunctionComponent<any> =>
  (props: any) => {
    const theme: Theme = useTheme();

    const styles = useStyles({ theme });
    return (
      <div className={styles.container}>
        <Header />
        <Component {...props} />
        {withFooter && <Footer />}
      </div>
    );
  };
export default withWrapper;
