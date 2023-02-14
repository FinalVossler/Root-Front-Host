import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputSelectContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 30,
    zIndex: 99,
  },
  selectLabel: {
    color: theme.lightTextColor,
    marginBottom: 10,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
