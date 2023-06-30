import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  entityEditorStatesContainer: {
    marginTop: 0,
    marginBottom: 20,
  },
  entityEditorStatesTitle: { fontSize: 30, color: theme.lightTextColor },
  stateContainer: {
    width: "50%",
    padding: 40,
    color: theme.lightTextColor,
    margin: "auto",
    fontSize: 30,
    textAlign: "center",
    border: "1px solid " + theme.lightTextColor,
    boxSizing: "border-box",
  },
  stateContainerConditionMet: {
    extend: "stateContainer",
    background: theme.secondary,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
