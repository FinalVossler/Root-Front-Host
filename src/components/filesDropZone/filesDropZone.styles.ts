import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  filesDropZoneContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dropIcon: {
    fontSize: 100,
    cursor: "pointer",
    color: theme.primary,
  },
  dropHereText: {
    color: theme.darkTextColor,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
