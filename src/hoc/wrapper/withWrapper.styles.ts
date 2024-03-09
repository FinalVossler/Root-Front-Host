import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  sideMenuAndContent: {
    display: "flex",
  },
  headerAndContent: {
    display: "flex",
    overflow: "auto",
    backgroundColor: theme.backgroundColor,
    position: "relative",
    flex: 1,
    flexDirection: "column",
  },
}));

export default useStyles;
