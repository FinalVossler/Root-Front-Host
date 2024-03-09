import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  pagesPageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    width: "100%",
    alignItems: "center",
    paddingBottom: 100,
  },
  goIcon: {
    fontSize: 20,
    color: theme.darkTextColor,
  },
}));

export default useStyles;
