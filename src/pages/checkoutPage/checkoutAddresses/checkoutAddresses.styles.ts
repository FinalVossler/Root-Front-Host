import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  checkoutAddressesContainer: {},

  checkoutActions: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
}));

export default useStyles;
