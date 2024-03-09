import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  modelStatesEditorContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    position: "relative",
    width: "100%",
  },
  statesTitle: {
    color: theme.darkTextColor,
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
    color: theme.darkTextColor,
  },
  statesContainer: {
    display: "flex",
    flexDirection: "column",
  },
  singleStateContainer: {
    position: "relative",
    width: "100%",
    border: "1px solid " + theme.darkTextColor,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingTop: 30,
  },
  deleteState: {
    position: "absolute",
    top: 5,
    right: -2,
    cursor: "pointer",
    color: theme.errorColor,
    fontSize: 20,
  },
  sortableModelStateHandle: {
    position: "absolute",
    top: 5,
    right: 20,
    fontSize: 20,
    cursor: "pointer",
    zIndex: 3,
  },
  "@media (max-width: 850px)": {
    createModelModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;
