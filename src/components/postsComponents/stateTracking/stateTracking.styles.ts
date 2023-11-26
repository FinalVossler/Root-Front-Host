import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  stateTrackingContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 10,
    marginBottom: 0,
    marginTop: 20,
    borderRadius: 20,
    marginRight: 100,
    marginLeft: 0,
  },
  bullet: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    backgroundColor: "#cbcbcb",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  activeBullet: {
    extend: "bullet",
    backgroundColor: theme.primary,
  },
  stateName: {
    position: "absolute",
    top: 60,
    color: "#cbcbcb",
    textAlign: "center",
    width: 100,
  },
  activeStateName: {
    extend: "stateName",
    color: theme.primary,
  },
  "@media (max-width: 930px)": {
    stateTrackingContainer: {
      marginTop: 20,
      marginBottom: 70,
      margin: 0,
    },
    bullet: {
      width: 30,
      height: 30,
    },
    activeBullet: {
      width: 30,
      height: 30,
    },
    stateName: {
      fontSize: 13,
      marginTop: -20,
    },
    activeStateName: {
      fontSize: 13,
      marginTop: -20,
    },
  },
}));

export default useStyles;
