import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerCartContainer: {
    position: "relative",
    cursor: "pointer",
    height: "100%",

    "&:hover": {
      boxShadow: theme.boxShadow,
    },
  },
  cartIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    margin: 19,
    padding: 5,
    width: 40,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
