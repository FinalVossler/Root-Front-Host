import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  titleAndTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    background: "transparent",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    color: theme.primary,
  },
  decorationContainer: {
    display: "flex",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  decorationIcon: {
    color: theme.primary,
    marginLeft: 10,
    marginRight: 10,
  },
  decorationLine: {
    backgroundColor: theme.primary,
    height: "1px",
    width: 100,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    maxWidth: 800,
    color: theme.darkTextColor,
    lineHeight: 1.2,
  },
  "@media (max-width: 850px)": {
    text: {
      maxWidth: 300,
    },
  },
}));

export default useStyles;
