import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatBoxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  chatMessagesBox: {
    flex: 1,
    color: theme.lightTextColor,
    marginTop: 60,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    alignItems: "flex-start",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
