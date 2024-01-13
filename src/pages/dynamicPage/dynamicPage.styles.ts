import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
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
