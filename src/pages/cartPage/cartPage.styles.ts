import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cartPageContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
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
    marginLeft: 20,
    boxShadow: theme.boxShadow,
    borderRadius: 5,
    position: "relative",
  },
  yourCartTitle: {
    display: "flex",
    fontSize: 30,
    flex: 1,
    margin: 20,
    marginTop: 10,
    marginBottom: 0,
    paddingBottom: 10,
    borderBottom: "1px solid " + theme.borderColor,
    boxSizing: "border-box",
  },
  priceTitle: {
    position: "absolute",
    right: 27,
    top: 30,
    fontSize: 15,
  },
  subTotalContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: 20,
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
