import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
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
