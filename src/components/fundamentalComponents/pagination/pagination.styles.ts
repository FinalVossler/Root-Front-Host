import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  paginationContainer: {
    color: theme.darkTextColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
