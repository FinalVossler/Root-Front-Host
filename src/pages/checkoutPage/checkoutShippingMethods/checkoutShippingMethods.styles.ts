import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutShippingMethodsContainer: {
    padding: 15,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  shippingMethodTitle: {
    marginBottom: 10,
    marginTop: 0,
    color: theme.darkTextColor,
    fontWeight: "inherit",
  },
  shippingMethodInfo: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.subContentBackgroundColor,
    padding: 15,
    borderRadius: 5,
    position: "relative",
    boxShadow: theme.boxShadow,
  },
  selectedShippingMethodInfo: {
    extend: "shippingMethodInfo",
    backgroundColor: theme.contentBackgroundColor,
  },

  horizontalDetails: {
    display: "flex",
    alignItems: "center",

    "& > span": {
      marginTop: 5,
      marginBottom: 5,
    },
  },
  singleInfoTitle: {
    marginRight: 5,
  },
  singleInfoValue: {
    textDecoration: "undeline",
    fontWeight: "bold",
  },
  checkoutActions: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },

  productInfoAndShippingMethodsAndActionsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  productInfoAndShippingMethodsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  productShippingMethodsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    marginRight: 10,
  },
  productImage: {
    width: 100,
  },
  actionsAndPriceContainer: {
    display: "flex",
    alignItems: "center",

    position: "absolute",
    right: 10,
    top: 0,
    height: "100%",
  },
  actionButton: {
    padding: 5,
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: theme.lightTextColor,
    color: theme.primary,
    border: "1px solid " + theme.primary,
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,
    },
  },
  price: {
    fontWeight: "bold",
  },
}));

export default useStyles;
