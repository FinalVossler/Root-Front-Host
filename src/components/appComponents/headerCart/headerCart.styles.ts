import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerCartContainer: {
    position: "relative",
  },
  cartIconContainer: {
    cursor: "pointer",
  },
  cartIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    cursor: "pointer",
    margin: 20,
    padding: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
