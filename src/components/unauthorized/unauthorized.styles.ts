import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  unauthorizedContainer: {
    display: "flex",
    width: "100%",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  title: {
    fontSize: 40,
    marginTop: 100,
    color: theme.darkTextColor,
    marginBottom: 300,
  },
}));

export default useStyles;
