import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  contactFormContainer: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid " + theme.primary,
    padding: 20,
    borderRadius: 10,
    boxShadow: theme.boxShadow,
    maxWidth: "1100px",
    boxSizing: "border-box",
  },
  title: {
    color: theme.lightTextColor,
  },
  description: {
    color: theme.lightTextColor,
  },
  loading: {
    margin: "auto",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
