import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  homePageContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 100,
  },
  content: {
    maxWidth: 1100,
    display: "flex",
    flexDirection: "column",
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
