import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsBoardContainer: {
    display: "flex",
    marginRight: 10,
    overflow: "scroll",
    width: "100%",
  },
  stateContainer: {
    flex: 1,
  },
  modelStateName: {
    color: theme.lighterPrimary,
    height: 50,
  },
  entityCard: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid " + theme.lightTextColor,
    color: theme.lightTextColor,
    padding: 5,
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
  },
  fieldLabel: {
    marginRight: 10,
    color: theme.primary,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
