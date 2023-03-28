import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postWrapperContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.contentBackgroundColor,
    padding: 40,
    boxSizing: "border-box",
    marginBottom: 20,
    borderRadius: 10,
    boxShadow: theme.boxShadow,
    overflow: "auto",
    position: "relative",
  },
  "@media (max-width: 800px)": {
    postWrapperContainer: {
      padding: 0,
      flex: "initial",
      overflow: "auto",
    },
  },
}));

export default useStyles;
