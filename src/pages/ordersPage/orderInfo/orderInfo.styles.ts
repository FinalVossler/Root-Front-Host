import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  orderInfoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.subContentBackgroundColor,
    color: theme.darkTextColor,
    marginBottom: 20,
    boxShadow: theme.boxShadow,
  },
  orderInfoHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    width: "100%",
    padding: 15,
    boxSizing: "border-box",
    overflow: "auto",

    borderTopLeftRadius: "5px",
    borderTopRightRadius: 5,

    cursor: "pointer",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  orderDate: {
    width: 300,
  },
  orderTotal: {
    fontWeight: "bold",
  },
  shippedTo: {
    width: 300,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  orderNumber: {},
  productContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid " + theme.borderColor,
    borderTop: "none",
    width: "100%",

    padding: 20,
    boxSizing: "border-box",
  },
  productBasicContent: {
    display: "flex",
    flex: 1,
    paddingBottom: 10,
  },
  productImage: {
    width: 60,
    height: "fit-content ",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
    flex: 1,
  },
  productMainInfo: {
    marginBottom: 5,
  },
  statusesContainer: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
    padding: "10px 50px",

    paddingBottom: 50,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    border: "1px solid " + theme.borderColor,
    borderTop: "none",
  },
  statusesTitle: {
    marginBottom: 0,
  },
  positiveStatusesContainer: {},
  negativeStatusesContainer: {
    marginTop: 30,
  },
  extendDetails: {},
  "@media (max-width: 1000px)": {
    orderInfoHeader: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    headerLeft: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    headerRight: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    orderDate: {
      width: "initial",
    },
    shippedTo: {
      width: "initial",
    },
  },
}));

export default useStyles;
