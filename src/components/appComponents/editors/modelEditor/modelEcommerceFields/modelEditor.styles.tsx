import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  ecommerceFieldContainer: {
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  removeEcommerceFieldIcon: {
    cursor: "pointer",
    color: theme.errorColor,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
