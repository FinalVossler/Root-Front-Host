import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
