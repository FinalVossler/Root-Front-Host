import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutPaymentMethodsContainer: {
    padding: 15,
    paddingTop: 0,
  },
  paymentMethodTitle: {
    marginBottom: 10,
    marginTop: 0,
    color: theme.darkTextColor,
    fontWeight: "inherit",
  },
  paymentMethodInfo: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.subContentBackgroundColor,
    padding: 15,
    borderRadius: 5,
    position: "relative",
    boxShadow: theme.boxShadow,
  },
  selectedPaymentMethodInfo: {
    extend: "paymentMethodInfo",
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

  actionsContainer: {
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
