import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsBoardContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
    overflow: "auto",
    paddingTop: 10,
    paddingBottom: 40,
    fontSize: 14,
    marginTop: 0,

    borderRadius: 10,
  },
  entityCardAndStateTrackingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 0,
  },
  stateContainer: {
    minWidth: 205,

    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 10,
  },
  modelStateName: {
    color: theme.darkTextColor,
    margin: 0,
    marginBottom: 0,
    marginTop: 10,
    textAlign: "center",
    height: 40,
  },
  mainModelFields: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 25,
  },
  entityCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    border: "1px solid " + theme.lightTextColor,
    color: theme.lightTextColor,
    padding: 5,
    width: 300,
    marginBottom: 10,
    borderRadius: 5,
    boxSizing: "border-box",
    position: "relative",
  },
  subStates: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
    flexWrap: "wrap",
  },
  subState: {
    flex: 1,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    color: theme.darkTextColor,
    backgroundColor: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    textAlign: "center",
    display: "flex",
    padding: 7,
  },
  filledSubState: {
    extend: "subState",
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    background:
      "linear-gradient(to right, " +
      theme.darkerPrimary +
      ", " +
      theme.primary +
      ")",
  },
  entityMainFieldValue: {
    color: theme.darkTextColor,
    marginBottom: 2,
    marginLeft: 15,
    marginRight: 15,
  },
  fieldLabel: {
    marginRight: 10,
    color: theme.darkTextColor,
  },
  editEntityIcon: {
    cursor: "pointer",
    position: "absolute",
    color: theme.darkTextColor,
    right: 30,
    fontSize: 20,
  },
  visitEntityIcon: {
    cursor: "pointer",
    position: "absolute",
    color: theme.darkTextColor,
    right: 5,
    fontSize: 20,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
