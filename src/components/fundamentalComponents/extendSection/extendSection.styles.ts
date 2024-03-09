import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  sectionTitle: {
    width: "100%",
    textAlign: "start",
    color: theme.primary,
    cursor: "pointer",
    marginBottom: 20,
    fontSize: 30,
  },
  sectionSmall: {
    extend: "sectionTitle",
    fontSize: 20,
  },
  arrowIcon: {
    position: "relative",
    top: 7,
    marginLeft: 10,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
