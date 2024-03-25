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
  cartPageLeft: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "fit-content",
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
  cartSidedProducts: {
    extend: "cartProducts",
    marginTop: 20,
  },
  yourCartTitle: {
    display: "flex",
    fontSize: 30,
    margin: 20,
    marginTop: 10,
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 5,
    borderBottom: "1px solid " + theme.borderColor,
    boxSizing: "border-box",
  },
  sidedProductsTitle: {
    extend: "yourCartTitle",
  },
  priceTitle: {
    position: "absolute",
    right: 30,
    top: 35,
    fontSize: 15,
  },
  subTotalContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    backgroundColor: theme.lightTextColor,
    margin: 20,
    boxSizing: "border-box",
    paddingTop: 10,
    borderTop: "1px solid " + theme.borderColor,
    fontWeight: "bold",
  },
  sideSubTotalContainer: {
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

  "@media (max-width: 1300px)": {
    cartPageContainer: {
      // flexDirection: "column",
    },
  },
}));

export default useStyles;
