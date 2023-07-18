import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  dynamicPageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    width: "100%",
    alignItems: "center",
    minHeight: "100vh",
    overflow: "auto",
  },
}));

export default useStyles;
