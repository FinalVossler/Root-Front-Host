import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postWrapperContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.secondary,
    padding: 40,
    boxSizing: "border-box",
    marginBottom: 20,
    borderRadius: 10,
    boxShadow: theme.boxShadow,
    overflow: "hidden",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
