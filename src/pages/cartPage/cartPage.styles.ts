import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cartPageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    height: "100vh",
    width: "100%",
    marginTop: 100,
    backgroundColor: theme.backgroundColor,
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  cartProducts: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: theme.lightTextColor,
    height: "fit-content",
    marginLeft: 10,
    boxShadow: theme.boxShadow,
    borderRadius: 5,
  },
  subTotalContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: 10,
    backgroundColor: theme.lightTextColor,
    position: "sticky",
    top: 0,
    height: "fit-content",
    padding: 20,
    borderRadius: 5,
    boxShadow: theme.boxShadow,
  },
  subTotalTitleAndValueContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  subTotalTitle: {
    marginRight: 10,
  },
  subTotal: {},
}));

export default useStyles;
