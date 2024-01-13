import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  underlinedTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    position: "relative",
    width: "80%",
    maxWidth: "1100px",
  },
  title: {
    color: theme.primary,
    fontSize: 25,
    paddingBottom: 20,
    paddingRight: 100,
    borderBottom: "5px solid " + theme.primary,
    boxSizing: "border-box",
    maxWidth: "100%",
  },
  "@media (max-width: 750px)": {},
}));

export default useStyles;
