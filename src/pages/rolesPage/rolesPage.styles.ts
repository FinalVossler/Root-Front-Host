import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  rolesPageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    width: "100%",
    alignItems: "center",
    minHeight: "100vh",
    paddingBottom: 100,
  },
}));

export default useStyles;
