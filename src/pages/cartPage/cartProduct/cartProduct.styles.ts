import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cartProductContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid " + theme.borderColor,
    justifyContent: "space-between",
    padding: 30,
    boxSizing: "border-box",
  },

  left: {
    display: "flex",
    flexDirection: "row",
  },
  productImage: {
    width: 150,
    marginRight: 30,
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
  },
  productMainInfo: {},
  right: {
    display: "flex",
    flexDirection: "column",
  },
  productSingleMainInfoTitle: {
    color: theme.darkerPrimary,
    fontSize: 20,
  },
  productSingleManInfoValue: {
    color: theme.darkTextColor,
    marginLeft: 10,
  },
}));

export default useStyles;
