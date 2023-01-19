import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
}));

export default useStyles;
