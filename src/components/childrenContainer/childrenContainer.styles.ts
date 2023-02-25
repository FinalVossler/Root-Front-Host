import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  childrenContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "auto",
    marginBottom: 40,
    maxWidth: 1100,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
