import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  childrenContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "auto",
    marginBottom: 40,
    maxWidth: "1100px",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
