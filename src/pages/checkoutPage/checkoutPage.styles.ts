import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutPageContainer: {
    padding: 50,
    marginTop: 60,
    display: "flex",
  },
}));

export default useStyles;
