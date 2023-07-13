import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  paginationContainer: {
    color: theme.darkTextColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
