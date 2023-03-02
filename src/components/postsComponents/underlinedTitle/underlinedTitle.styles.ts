import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  underlinedTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    position: "relative",
    width: "80%",
  },
  title: {
    color: theme.primary,
    fontSize: 25,
    paddingBottom: 20,
    paddingRight: 100,
    borderBottom: "5px solid " + theme.primary,
  },
  "@media (max-width: 750px)": {},
}));

export default useStyles;
