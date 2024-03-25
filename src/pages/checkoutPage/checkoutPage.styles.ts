import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutPageContainer: {
    padding: 50,
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
