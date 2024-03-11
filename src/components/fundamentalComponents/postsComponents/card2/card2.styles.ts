import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: 300,
    width: 300,
    backgroundColor: theme.contentBackgroundColor,
    boxShadow: theme.boxShadow,
    borderRadius: 10,
    padding: 20,
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: ".1s all ease-in-out",
    margin: 20,
    "&:hover": {
      backgroundColor: theme.primary,
    },
    "&:hover $cardTitle": {
      color: theme.lightTextColor,
    },
    "&:hover $cardDescription": {
      color: theme.lightTextColor,
    },
  },
  cardTitle: {
    fontSize: 20,
    color: theme.lightTextColor,
    marginTop: 20,
    transition: ".1s all ease-in-out",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 13,
    color: theme.lightTextColor,
    lineHeight: 2,
    fontWeight: 400,
    transition: ".1s all ease-in-out",
    maxWidth: theme.formMaxWidth,
    maxHeight: 100,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    backgroundPosition: "center",
    backgroundSize: "cover",
    transition: "all .3s ease-in-out",
    border: "1px solid " + theme.primary,
  },
  "@media (max-width: 800px)": {},
  "@media (max-width: 680px)": {},
}));

export default useStyles;
