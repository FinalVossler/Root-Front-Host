import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsBoardContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginRight: 10,
    overflow: "auto",
    paddingTop: 10,
    paddingBottom: 40,
    paddingLeft: 50,
    fontSize: 14,
    justifyContent: "flex-end",

    borderRadius: 10,
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
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  mainModelFields: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 15,
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
    height: 264,
    width: 205,
    marginBottom: 10,
    borderRadius: 5,
    boxSizing: "border-box",
    position: "relative",
  },
  subStates: {
    display: "flex",
    flexDirection: "column",
    margin: 26,
    marginTop: 20,
    marginBottom: 15,
    height: 200,
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
    marginLeft: 26,
    marginRight: 26,
  },
  fieldLabel: {
    marginRight: 10,
    color: theme.darkTextColor,
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
