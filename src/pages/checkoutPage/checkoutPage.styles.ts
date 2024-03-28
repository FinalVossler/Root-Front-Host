import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutPageContainer: {
    padding: 50,
    marginTop: 55,
    display: "flex",
    flexDirection: "row",
    gap: 10,
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
  left: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: theme.subContentBackgroundColor,
    boxShadow: theme.boxShadow,
    borderRadius: 5,
  },
  right: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.subContentBackgroundColor,
    boxSizing: "border-box",
    padding: 20,
    boxShadow: theme.boxShadow,
    height: "fit-content",
    borderRadius: 5,
  },
  total: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 5,
    fontSize: 17,
    fontWeight: "bold",
    boxSizing: "border-box",
    color: theme.primary,
  },
  productsTotalContainer: {
    extend: "total",
    color: theme.darkTextColor,
    padding: 0,
  },
  shippingMethodPriceContainer: {
    extend: "total",
    color: theme.darkTextColor,
    padding: 0,
  },
  "@media (max-width: 1000px)": {
    checkoutPageContainer: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
