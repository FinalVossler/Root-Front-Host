import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  personContainer: {
    display: "flex",
    width: 200,
    height: 350,
    margin: "auto",
    flexDirection: "column",
    color: theme.lightTextColor,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: "50%",

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",

    marginBottom: 20,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center",
  },
  occupation: {
    fontWeight: "lighter",
    fontSize: 14,
    textAlign: "center",
  },
  cvButton: {
    border: "1px solid " + theme.lightTextColor,
    marginTop: 30,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 40,
    paddingRight: 40,
    boxSizing: "border-box",
    borderRadius: 20,
    fontSize: 17,
    cursor: "pointer",
    transition: ".15s all ease-in-out",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    color: theme.lightTextColor,

    "&:hover": {
      backgroundColor: theme.lightTextColor,
      color: theme.primary,
    },
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
