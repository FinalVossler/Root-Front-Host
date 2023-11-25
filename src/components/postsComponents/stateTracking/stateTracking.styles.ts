import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  stateTrackingContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 15,
    marginBottom: 0,
    marginTop: 20,
    borderRadius: 20,
    marginRight: 100,
    marginLeft: 100,
  },
  bullet: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: theme.borderColor,
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
    color: theme.borderColor,
    textAlign: "center",
    textWrap: "nowrap",
    width: 100,
  },
  activeStateName: {
    extend: "stateName",
    color: theme.primary,
  },
}));

export default useStyles;
