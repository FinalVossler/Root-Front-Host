import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  unauthorizedContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 100,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    marginTop: 100,
  },
}));

export default useStyles;
