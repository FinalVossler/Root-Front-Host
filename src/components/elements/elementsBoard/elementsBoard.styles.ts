import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsBoardContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginRight: 10,
    overflow: "scroll",
    padding: 10,
    paddingBottom: 40,

    borderRadius: 10,
  },
  stateContainer: {
    minWidth: 280,
    display: "flex",
    flexDirection: "column",
    marginRight: 5,
    backgroundColor: theme.secondary,
    padding: 10,
    borderRadius: 10,
  },
  modelStateName: {
    color: theme.lighterPrimary,
    margin: 0,
    marginBottom: 20,
    marginTop: 10,
  },
  mainModelFields: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    overflow: "scroll",
  },
  entityCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid " + theme.lightTextColor,
    color: theme.lightTextColor,
    padding: 5,
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
    boxSizing: "border-box",
    position: "relative",
  },
  subStates: {
    display: "flex",
    flexDirection: "row",
  },
  subState: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: "1px solid " + theme.lightTextColor,
    margin: 5,
  },
  filledSubState: {
    extend: "subState",
    backgroundColor: theme.primary,
  },
  entityMainFieldValue: {
    color: theme.lightTextColor,
    marginBottom: 10,
  },
  fieldLabel: {
    marginRight: 10,
    color: theme.primary,
  },
  visitEntityIcon: {
    cursor: "pointer",
    position: "absolute",
    color: theme.lightTextColor,
    right: 5,
    fontSize: 20,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
