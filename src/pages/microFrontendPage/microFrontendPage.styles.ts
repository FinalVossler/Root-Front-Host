import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  microFrontendPageContainer: {
    display: "flex",
    height: "100vh",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.backgroundColor,
  },
  loading: {
    color: theme.primary,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
