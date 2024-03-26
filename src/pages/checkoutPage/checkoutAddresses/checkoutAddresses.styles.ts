import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutAddressesContainer: {
    // paddingBottom: 20,
    borderRadius: 10,
    padding: 15,
  },
  addressTitle: {
    marginBottom: 10,
    marginTop: 0,
    color: theme.darkTextColor,
    fontWeight: "inherit",
  },

  checkoutActions: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 0,
  },
}));

export default useStyles;
