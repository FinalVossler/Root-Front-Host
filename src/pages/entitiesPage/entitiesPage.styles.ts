import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  entitiesPageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    width: "100%",
    alignItems: "center",
    minHeight: "100vh",
    paddingBottom: 100,
    overflow: "auto",
  },
}));

export default useStyles;
