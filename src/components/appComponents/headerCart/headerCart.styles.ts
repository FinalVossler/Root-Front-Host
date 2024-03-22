import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerCartContainer: {
    position: "relative",
    cursor: "pointer",

    transition: "all .2s ease-in-out",
    "&:hover": {
      boxShadow: theme.boxShadow,
    },
  },
  cartIconContainer: {
    cursor: "pointer",
  },
  cartIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    margin: 19,
    padding: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
