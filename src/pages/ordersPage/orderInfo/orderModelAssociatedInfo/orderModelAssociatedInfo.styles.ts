import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  orderModelAssociatedInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid " + theme.borderColor,
    borderTop: "none",
    width: "100%",
    boxSizing: "border-box",
    padding: 10,

    "& >form": {
      padding: "20px!important",
      boxSizing: "border-box",
    },
  },
  "@media (max-width: 1000px)": {},
}));

export default useStyles;
