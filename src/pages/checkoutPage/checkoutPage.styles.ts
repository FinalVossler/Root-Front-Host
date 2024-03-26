import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutPageContainer: {
    padding: 50,
    marginTop: 55,
    display: "flex",
    flexDirection: "column",
  },
  checkoutActions: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  error: {
    color: theme.errorColor,
    marginLeft: 15,
    marginBottom: 10,
  },
}));

export default useStyles;
