import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  videoContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  videoIconContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: theme.lightTextColor,
    width: 70,
    height: 70,

    border: "2px solid " + theme.primary,
    boxSizing: "border-box",
  },
  animatedVideoIconContainer: {
    extend: "videoIconContainer",
    position: "absolute",
    zIndex: -1,
    animationName: "$getBiggerAndFade",
  },
  "@keyframes getBiggerAndFade": {
    from: {
      width: 70,
      height: 70,
    },
    to: {
      width: 100,
      height: 100,
    },
  },
  videoIcon: {
    fontSize: 30,
  },
  videoTitle: {
    color: theme.primary,
    fontSize: 30,
    marginLeft: 20,
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: 60,
  },
  modalTitle: {
    color: theme.primary,
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20,
  },
  video: {
    boxShadow: theme.boxShadow,
    maxWidth: "100%",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
