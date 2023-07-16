import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  singleEntityPageContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 100,
    color: theme.lightTextColor,
    alignItems: "center",
    width: "90%",
    margin: "auto",
  },
  entityValuesContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export default useStyles;
