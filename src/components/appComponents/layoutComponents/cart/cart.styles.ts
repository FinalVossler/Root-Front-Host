import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cartContainer: {
    boxShadow: theme.boxShadow,
    width: 129,
    borderLeft: ".5px solid " + theme.borderColor,
    zIndex: 12,
    backgroundColor: theme.lightTextColor,
    overflow: "auto",
  },
  totalContainer: {
    borderBottom: "1px solid " + theme.borderColor,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: 81,
    fontSize: 15,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  subTotal: {
    color: theme.errorColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  subTotalTitle: { marginBottom: 5 },
  cartSingleProduct: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    borderBottom: ".5px solid " + theme.borderColor,
    paddingTop: 15,
    paddingBottom: 15,
  },
  productImage: {
    width: "85%",
    margin: "auto",
    marginBottom: 10,
  },
  price: {},
  productActionsContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  trashIcon: {
    cursor: "pointer",
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    position: "relative",
    bottom: 2,
  },
}));

export default useStyles;
