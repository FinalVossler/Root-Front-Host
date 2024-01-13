import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  homePageContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: theme.backgroundColor,
  },
  content: {
    maxWidth: 1100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
    marginBottom: 40,
  },
}));

export default useStyles;
