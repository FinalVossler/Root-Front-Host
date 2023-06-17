import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  modelStatesEditorContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    maxHeight: "calc(100vh - 200px)",
    position: "relative",
    width: "100%",
  },
  statesTitle: {
    color: theme.lighterPrimary,
    fontSize: 25,
    marginBottom: 10,

    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  triggerArrow: {
    position: "relative",
    bottom: 2,
  },
  statesTypeTitle: {
    color: theme.lightTextColor,
  },
  statesContainer: {
    display: "flex",
    flexDirection: "column",
  },
  singleStateContainer: {
    position: "relative",
    width: "100%",
  },
  deleteState: {
    position: "absolute",
    top: 0,
    right: -2,
    cursor: "pointer",
    color: theme.errorColor,
    fontSize: 20,
  },
  "@media (max-width: 850px)": {
    createModelModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;
