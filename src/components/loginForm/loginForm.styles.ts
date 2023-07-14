import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  loginFormContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.formMaxWidth,
    width: "80%",
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
    margin: "auto",
    marginBottom: 0,
    marginTop: 5
  },
  loginTitle: {
    fontSize: 30,
    color: theme.darkTextColor,
    textAlign: 'center',
    marginTop: 0
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
