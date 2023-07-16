import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  fieldsEditorContainer: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  fieldsTitle: {
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
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  singleModelFieldContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    border: "1px solid " + theme.primary,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: "100%",
    boxSizing: "border-box",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
