import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  animatedTitleContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 800,
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  wordContainer: {
    display: "flex",
    alignItems: "center",
  },
  letterContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    "&:hover $mainLetter": {
      transform: "rotate(-15deg) translate(-2px, -2px)",
    },

    "&:hover $subLetter": {
      filter: "drop-shadow(0 0 5px " + theme.lighterPrimary + ")",
    },
  },
  mainLetter: {
    color: theme.darkerPrimary,
    zIndex: 1,
    fontSize: "14vw",
    cursor: "pointer",
    transition: "all .2s ease-in-out",
    position: "relative",
  },
  subLetter: {
    extend: "mainLetter",
    color: theme.lighterPrimary,
    zIndex: 0,
    border: "none",
    position: "absolute",
    left: 0,
    top: 0,
  },
  trait1: {
    position: "absolute",
    transform: "rotate(70deg)",
    height: 2,
    background:
      "linear-gradient(45deg," +
      theme.lighterPrimary +
      " 17%," +
      theme.darkerPrimary +
      80 +
      "," +
      theme.darkerPrimary +
      30 +
      ")",
    right: -100,
    left: "80%",
    width: "50%",
    opacity: 0.5,
  },
  trait2: {
    extend: "trait1",
    width: "40%",
    background:
      "linear-gradient(45deg," +
      theme.lighterPrimary +
      " 17%," +
      theme.darkerPrimary +
      "," +
      theme.darkerPrimary +
      50 +
      ")",
  },
  "@media (max-width: 750px)": {
    trait1: {
      display: "none",
    },
    trait2: {
      display: "none",
    },
  },
}));

export default useStyles;
