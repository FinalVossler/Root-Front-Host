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
  },
  price: {},
  productActionsContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  trashIcon: {
    cursor: "pointer",
    marginLeft: 10,
    padding: 5,
    position: "relative",
    bottom: 2,
  },
}));

export default useStyles;
