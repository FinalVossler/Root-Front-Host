import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  microFrontendPageContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.backgroundColor,
    marginTop: 80,
  },
  loading: {
    color: theme.primary,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
