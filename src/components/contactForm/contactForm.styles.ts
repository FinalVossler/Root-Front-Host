import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  contactFormContainer: {
    width: "90%",
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
    color: theme.darkTextColor,
  },
  description: {
    color: theme.darkTextColor,
  },
  loading: {
    margin: "auto",
  },
  "@media (max-width: 800px)": {
    contactFormContainer: {
      width: "95%",
    },
  },
}));

export default useStyles;
