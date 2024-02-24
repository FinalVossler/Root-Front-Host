import { createUseStyles } from "react-jss";

import { ITheme } from "../../../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  entityEditorStatesContainer: {
    marginTop: 0,
    marginBottom: 40,
  },
  entityEditorStatesTitle: { fontSize: 30, color: theme.darkTextColor },
  stateContainer: {
    width: "50%",
    padding: 40,
    color: theme.darkTextColor,
    margin: "auto",
    fontSize: 30,
    textAlign: "center",
    border: "1px solid " + theme.darkTextColor,
    boxSizing: "border-box",
  },
  stateContainerConditionMet: {
    extend: "stateContainer",
    background: theme.secondary,
  },
  checkIcon: {
    position: "relative",
    top: 5,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
