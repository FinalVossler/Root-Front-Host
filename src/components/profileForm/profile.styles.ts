import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profileFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: theme.formMaxWidth,
    width: "70%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 40,
    backgroundColor: theme.contentBackgroundColor,
  },
  profileFormTitle: {
    fontSize: 30,
    color: theme.primary,
  },
  profileForm: {
    display: "flex",
    flexDirection: "column",
  },
  userRole: {
    color: theme.lightTextColor,
    marginBottom: 10,
  },
  actualRole: {
    fontWeight: "bold",
    color: theme.primary,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
