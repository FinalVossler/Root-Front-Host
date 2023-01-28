import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.contentBackgroundColor,
    color: theme.lightTextColor,
    justifyContent: "flex-start",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  socialMedia: {
    display: "flex",
    flexDirection: "column",
    margin: 30,
  },
  socialMediaTitle: {
    color: theme.lightTextColor,
    fontSize: 20,
    marginBottom: 10,
  },
  socialMediaIcons: {
    display: "flex",
    alignItems: "center",
  },
  socialMediaIcon: {
    fontSize: 30,
    marginRight: 20,
    transition: "all .2s ease-in-out",

    "&:hover": {
      boxShadow: "1px 2px 20px 20px black",
    },
  },
  year: {
    color: "grey",
    borderTop: "1px solid grey",
    width: "80%",
    margin: "auto",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    paddingTop: 20,
  },
  "@media (max-width: 400px)": {},
}));

export default useStyles;
