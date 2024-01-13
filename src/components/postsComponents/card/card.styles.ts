import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 500,
    height: 300,
    position: "relative",
    padding: 20,
    boxSizing: "border-box",
    marginTop: 20,
    marginBottom: 5,
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "1px 2px 20px 0.1px black",
    transition: "all .2s ease-in-out",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 1,

    "&:hover": {
      boxShadow: "1px 2px 20px 15px black",
    },
  },
  cardTitle: {
    fontSize: 30,
    textAlign: "center",
    color: theme.lightTextColor,
    margin: 10,
  },
  cardDescription: {
    fontSize: 15,
    color: theme.lightTextColor,
    textAlign: "center",
    lineHeight: 2,
    fontWeight: 400,
    opacity: 0.9,
    maxWidth: theme.formMaxWidth,
    margin: 5,
  },
  cardImage: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    backgroundPosition: "center",
    backgroundSize: "cover",
    transition: "all .3s ease-in-out",
  },
  cardLayer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.8,
  },
  "@media (max-width: 800px)": {
    cardContainer: {
      width: 340,
    },
  },
  "@media (max-width: 680px)": {
    cardContainer: {
      width: "80%",
    },
  },
}));

export default useStyles;
