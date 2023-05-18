import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  singleEntityPageContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 100,
    color: theme.lightTextColor,
    alignItems: "center",
  },
}));

export default useStyles;
