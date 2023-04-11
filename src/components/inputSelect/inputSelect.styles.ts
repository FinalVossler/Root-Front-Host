import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputSelectContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    marginBottom: 10,
    alignItems: "center",
  },
  selectLabel: {
    color: theme.lightTextColor,
    marginRight: 10,
    width: 170,

    textAlign: "start",
  },
  select: {
    flex: 1,
    backgroundColor: theme.contentBackgroundColor,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
