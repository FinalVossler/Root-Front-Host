import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  sectionTitle: {
    width: "100%",
    textAlign: "start",
    color: theme.primary,
    cursor: "pointer",
    marginBottom: 20,
    fontSize: 30,
  },
  arrowIcon: {
    position: "relative",
    top: 7,
    marginLeft: 10,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
