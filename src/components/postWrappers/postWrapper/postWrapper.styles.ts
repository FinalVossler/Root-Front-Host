import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postWrapperContainer: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    border: "1px solid " + theme.borderColor,
    padding: 10,
    boxShadow: theme.boxShadow,
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
