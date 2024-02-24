import { createUseStyles } from "react-jss";
import { ITheme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  viewTabsContainer: {
    marginTop: 80,

    display: "flex",
    width: "100%",
    backgroundColor: theme.lightTextColor,
    marginBottom: 10,
    borderTop: "1px solid " + theme.darkTextColor,
    position: "sticky",
    top: 0,
  },
  viewTab: {
    flex: 1,
    textAlign: "center",
    transition: ".1s all ease-in-out",
    cursor: "pointer",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "4px solid " + theme.lightTextColor,
    boxSizing: "border-box",
    height: 55,
  },
  selectedViewTab: {
    extend: "viewTab",
    color: theme.darkerPrimary,
    borderBottom: "4px solid " + theme.darkerPrimary,
    fontWeight: "bold",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
