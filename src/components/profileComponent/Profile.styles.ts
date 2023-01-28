import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: theme.formMaxWidth,
    width: "70%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: theme.contentBackgroundColor,
  },
  profileTitle: {
    fontSize: 30,
    color: theme.primary,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
