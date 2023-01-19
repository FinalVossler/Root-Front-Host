import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  ProfileContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: 500,
    width: "70%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    boxShadow: "0.1px 0.01px 30px 0.3px #e4e4e4",
    paddingBottom: 40,
  },
  profileTitle: {
    fontSize: 30,
    color: theme.textColor,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
