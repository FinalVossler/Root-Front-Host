import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  ordersTitle: {
    color: theme.darkTextColor,
  },
  ordersPageContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 100,
    padding: "0px 50px",
  },
}));

export default useStyles;