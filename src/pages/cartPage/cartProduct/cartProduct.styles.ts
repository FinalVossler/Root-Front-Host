import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cartProductContainer: {
    display: "flex",
    flexDirection: "row",
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
  productInfoAndActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  productMainFields: { display: "flex", flexDirection: "column" },

  productMainInfo: {
    marginBottom: 5,
  },
  right: {
    display: "flex",
    flexDirection: "column",
  },
  price: {},
  productSingleMainInfoTitle: {
    color: theme.darkerPrimary,
    fontSize: 16,
  },
  productSingleManInfoValue: {
    color: theme.darkTextColor,
    marginLeft: 5,
  },
}));

export default useStyles;
