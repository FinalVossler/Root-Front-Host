import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  orderInfoContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.subContentBackgroundColor,
  },
  orderInfoHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.contentBackgroundColor,
    border: "1px solid " + theme.borderColor,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  orderDate: {},
  orderTotal: {},
  shippedTo: {},
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  orderNumber: {},
  productContent: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid " + theme.borderColor,
    borderTop: "none",
  },
  productContentLeft: {
    display: "flex",
  },
  productImage: {
    width: 100,
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
  },
  productMainInfo: {},
  productContentRight: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
